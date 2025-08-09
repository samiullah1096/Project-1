import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdSlot, Analytics, InsertAdSlot } from '@shared/schema';

interface AdManagementData {
  adSlots: AdSlot[];
  analytics: {
    totalUsage: number;
    mostPopular: string;
    popularUsage: number;
    successRate: string;
    toolStats: Array<{
      name: string;
      category: string;
      usageCount: number;
      successRate: number;
      avgProcessingTime: number;
    }>;
  } | null;
}

export function useAdManagement() {
  const queryClient = useQueryClient();

  // Fetch ad slots
  const {
    data: adSlots = [],
    isLoading: adSlotsLoading,
    error: adSlotsError
  } = useQuery<AdSlot[]>({
    queryKey: ['/api/admin/ad-slots'],
    enabled: true,
  });

  // Fetch analytics data
  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError
  } = useQuery({
    queryKey: ['/api/admin/analytics'],
    enabled: true,
  });

  // Create ad slot mutation
  const createAdSlotMutation = useMutation({
    mutationFn: async (adSlot: InsertAdSlot) => {
      const response = await fetch('/api/admin/ad-slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adSlot),
      });

      if (!response.ok) {
        throw new Error('Failed to create ad slot');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ad-slots'] });
    },
  });

  // Update ad slot mutation
  const updateAdSlotMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<AdSlot> }) => {
      const response = await fetch(`/api/admin/ad-slots/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update ad slot');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ad-slots'] });
    },
  });

  // Delete ad slot mutation
  const deleteAdSlotMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/ad-slots/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete ad slot');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ad-slots'] });
    },
  });

  // Track tool usage mutation
  const trackToolUsageMutation = useMutation({
    mutationFn: async (usage: {
      toolName: string;
      category: string;
      userId?: string;
      sessionId?: string;
      processingTime?: number;
      fileSize?: number;
      success: boolean;
    }) => {
      const response = await fetch('/api/analytics/tool-usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usage),
      });

      if (!response.ok) {
        throw new Error('Failed to track tool usage');
      }

      return response.json();
    },
  });

  // Convenience functions
  const createAdSlot = (adSlot: InsertAdSlot) => {
    return createAdSlotMutation.mutateAsync(adSlot);
  };

  const updateAdSlot = (id: string, updates: Partial<AdSlot>) => {
    return updateAdSlotMutation.mutateAsync({ id, updates });
  };

  const deleteAdSlot = (id: string) => {
    return deleteAdSlotMutation.mutateAsync(id);
  };

  const trackToolUsage = (usage: {
    toolName: string;
    category: string;
    userId?: string;
    sessionId?: string;
    processingTime?: number;
    fileSize?: number;
    success: boolean;
  }) => {
    return trackToolUsageMutation.mutateAsync(usage);
  };

  // Get ad slot by position and page
  const getAdSlot = (position: string, page: string): AdSlot | undefined => {
    return adSlots.find(slot => 
      slot.position === position && 
      slot.page === page && 
      slot.isActive
    );
  };

  // Get active ad slots for a specific page
  const getPageAdSlots = (page: string): AdSlot[] => {
    return adSlots.filter(slot => slot.page === page && slot.isActive);
  };

  return {
    // Data
    adSlots,
    analytics,
    
    // Loading states
    isLoading: adSlotsLoading || analyticsLoading,
    
    // Error states
    error: adSlotsError || analyticsError,
    
    // Mutations
    createAdSlot,
    updateAdSlot,
    deleteAdSlot,
    trackToolUsage,
    
    // Mutation states
    isCreating: createAdSlotMutation.isPending,
    isUpdating: updateAdSlotMutation.isPending,
    isDeleting: deleteAdSlotMutation.isPending,
    isTracking: trackToolUsageMutation.isPending,
    
    // Utility functions
    getAdSlot,
    getPageAdSlots,
  };
}

// Hook for tracking tool usage easily
export function useToolUsageTracking() {
  const { trackToolUsage } = useAdManagement();

  const trackUsage = (
    toolName: string,
    category: string,
    options: {
      processingTime?: number;
      fileSize?: number;
      success: boolean;
      userId?: string;
    }
  ) => {
    // Generate session ID if no user ID
    const sessionId = options.userId ? undefined : getOrCreateSessionId();
    
    return trackToolUsage({
      toolName,
      category,
      userId: options.userId,
      sessionId,
      processingTime: options.processingTime,
      fileSize: options.fileSize,
      success: options.success,
    });
  };

  return { trackUsage };
}

// Utility function to generate/retrieve session ID
function getOrCreateSessionId(): string {
  const sessionKey = 'toolsuite_session_id';
  let sessionId = localStorage.getItem(sessionKey);
  
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(sessionKey, sessionId);
  }
  
  return sessionId;
}
