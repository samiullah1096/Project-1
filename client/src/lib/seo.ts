import { useEffect } from 'react';

interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
  structuredData?: Record<string, any>;
}

// Update document head with SEO metadata
export function updateSEOMetadata(metadata: SEOMetadata) {
  // Update title
  if (metadata.title) {
    document.title = metadata.title;
  }

  // Helper function to update or create meta tags
  const updateMetaTag = (name: string, content: string, property?: boolean) => {
    const attribute = property ? 'property' : 'name';
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  };

  // Update basic meta tags
  if (metadata.description) {
    updateMetaTag('description', metadata.description);
  }

  if (metadata.keywords) {
    updateMetaTag('keywords', metadata.keywords);
  }

  if (metadata.robots) {
    updateMetaTag('robots', metadata.robots);
  }

  // Update Open Graph meta tags
  if (metadata.ogTitle) {
    updateMetaTag('og:title', metadata.ogTitle, true);
  }

  if (metadata.ogDescription) {
    updateMetaTag('og:description', metadata.ogDescription, true);
  }

  if (metadata.ogImage) {
    updateMetaTag('og:image', metadata.ogImage, true);
  }

  if (metadata.ogUrl) {
    updateMetaTag('og:url', metadata.ogUrl, true);
  }

  // Update Twitter Card meta tags
  if (metadata.twitterTitle) {
    updateMetaTag('twitter:title', metadata.twitterTitle);
  }

  if (metadata.twitterDescription) {
    updateMetaTag('twitter:description', metadata.twitterDescription);
  }

  if (metadata.twitterImage) {
    updateMetaTag('twitter:image', metadata.twitterImage);
  }

  // Update canonical link
  if (metadata.canonical) {
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', metadata.canonical);
  }

  // Update structured data
  if (metadata.structuredData) {
    let structuredDataElement = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataElement) {
      structuredDataElement = document.createElement('script');
      structuredDataElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataElement);
    }
    structuredDataElement.textContent = JSON.stringify(metadata.structuredData);
  }
}

// React hook for managing SEO metadata
export function useSEO(metadata: SEOMetadata) {
  useEffect(() => {
    updateSEOMetadata(metadata);
  }, [metadata]);
}

// Generate structured data for tools
export function generateToolStructuredData(toolName: string, toolDescription: string, toolUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolName,
    description: toolDescription,
    url: toolUrl,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Organization',
      name: 'ToolSuite Pro',
      url: 'https://toolsuitepro.com'
    }
  };
}

// Generate structured data for organization
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ToolSuite Pro',
    description: 'Professional online tools and converters for all your file processing needs',
    url: 'https://toolsuitepro.com',
    logo: 'https://toolsuitepro.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'Customer Service',
      email: 'support@toolsuitepro.com'
    },
    sameAs: [
      'https://twitter.com/toolsuitepro',
      'https://facebook.com/toolsuitepro',
      'https://linkedin.com/company/toolsuitepro'
    ]
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// SEO optimization utilities
export const seoUtils = {
  // Generate meta description from content
  generateMetaDescription: (content: string, maxLength: number = 160): string => {
    if (content.length <= maxLength) return content;
    
    const truncated = content.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 
      ? truncated.substring(0, lastSpace) + '...' 
      : truncated + '...';
  },

  // Extract keywords from content
  extractKeywords: (content: string, maxKeywords: number = 10): string[] => {
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    return Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, maxKeywords)
      .map(([word]) => word);
  },

  // Generate slug from title
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  // Validate SEO requirements
  validateSEO: (metadata: SEOMetadata): Array<{ field: string; message: string; severity: 'error' | 'warning' }> => {
    const issues: Array<{ field: string; message: string; severity: 'error' | 'warning' }> = [];

    // Title validation
    if (!metadata.title) {
      issues.push({ field: 'title', message: 'Title is required', severity: 'error' });
    } else if (metadata.title.length < 30) {
      issues.push({ field: 'title', message: 'Title should be at least 30 characters', severity: 'warning' });
    } else if (metadata.title.length > 60) {
      issues.push({ field: 'title', message: 'Title should be less than 60 characters', severity: 'warning' });
    }

    // Description validation
    if (!metadata.description) {
      issues.push({ field: 'description', message: 'Meta description is required', severity: 'error' });
    } else if (metadata.description.length < 120) {
      issues.push({ field: 'description', message: 'Meta description should be at least 120 characters', severity: 'warning' });
    } else if (metadata.description.length > 160) {
      issues.push({ field: 'description', message: 'Meta description should be less than 160 characters', severity: 'warning' });
    }

    // Open Graph validation
    if (!metadata.ogTitle) {
      issues.push({ field: 'ogTitle', message: 'Open Graph title is recommended', severity: 'warning' });
    }

    if (!metadata.ogDescription) {
      issues.push({ field: 'ogDescription', message: 'Open Graph description is recommended', severity: 'warning' });
    }

    if (!metadata.ogImage) {
      issues.push({ field: 'ogImage', message: 'Open Graph image is recommended', severity: 'warning' });
    }

    return issues;
  }
};

// Tool-specific SEO metadata generators
export const toolSEOGenerators = {
  pdfConverter: (inputFormat: string, outputFormat: string) => ({
    title: `${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} Converter - ToolSuite Pro`,
    description: `Convert ${inputFormat.toUpperCase()} files to ${outputFormat.toUpperCase()} format online for free. Fast, secure, and high-quality conversion with no file limits.`,
    keywords: `${inputFormat} to ${outputFormat}, ${inputFormat} converter, ${outputFormat} converter, pdf tools, file conversion`,
    structuredData: generateToolStructuredData(
      `${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} Converter`,
      `Convert ${inputFormat.toUpperCase()} files to ${outputFormat.toUpperCase()} format`,
      `https://toolsuitepro.com/tools/${inputFormat}-to-${outputFormat}`
    )
  }),

  imageProcessor: (toolName: string, description: string) => ({
    title: `${toolName} - ToolSuite Pro | Image Processing Tool`,
    description: `${description} Professional image processing with high-quality results and fast processing.`,
    keywords: `${toolName.toLowerCase()}, image processing, image tools, photo editor`,
    structuredData: generateToolStructuredData(
      toolName,
      description,
      `https://toolsuitepro.com/tools/${seoUtils.generateSlug(toolName)}`
    )
  }),

  textAnalyzer: (toolName: string, description: string) => ({
    title: `${toolName} - ToolSuite Pro | Text Analysis Tool`,
    description: `${description} Professional text analysis with detailed statistics and insights.`,
    keywords: `${toolName.toLowerCase()}, text analysis, writing tools, content analysis`,
    structuredData: generateToolStructuredData(
      toolName,
      description,
      `https://toolsuitepro.com/tools/${seoUtils.generateSlug(toolName)}`
    )
  })
};
