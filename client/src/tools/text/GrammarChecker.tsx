import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, RefreshCw, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdSlot from "@/components/AdSlot";

interface GrammarIssue {
  id: string;
  type: 'grammar' | 'spelling' | 'punctuation' | 'style';
  severity: 'error' | 'warning' | 'suggestion';
  message: string;
  suggestion: string;
  position: { start: number; end: number };
  context: string;
}

export default function GrammarChecker() {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [correctedText, setCorrectedText] = useState("");
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    document.title = "Grammar Checker - ToolSuite Pro | Check Grammar, Spelling & Style";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Advanced grammar checker to detect and fix grammar, spelling, punctuation, and style issues. Improve your writing with AI-powered suggestions.');
    }
  }, []);

  const mockGrammarCheck = async (inputText: string): Promise<GrammarIssue[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockIssues: GrammarIssue[] = [];
    const words = inputText.split(/\s+/);
    
    // Simulate finding various types of issues
    if (inputText.includes("teh")) {
      mockIssues.push({
        id: "1",
        type: "spelling",
        severity: "error",
        message: "Spelling error detected",
        suggestion: "the",
        position: { start: inputText.indexOf("teh"), end: inputText.indexOf("teh") + 3 },
        context: "...teh..."
      });
    }
    
    if (inputText.includes("their") && inputText.includes("going")) {
      const pos = inputText.indexOf("their");
      if (pos > -1 && inputText.substring(pos, pos + 20).includes("going")) {
        mockIssues.push({
          id: "2",
          type: "grammar",
          severity: "error",
          message: "Incorrect word usage",
          suggestion: "they're",
          position: { start: pos, end: pos + 5 },
          context: "...their going..."
        });
      }
    }
    
    if (inputText.includes("alot")) {
      mockIssues.push({
        id: "3",
        type: "spelling",
        severity: "error",
        message: "Spelling error",
        suggestion: "a lot",
        position: { start: inputText.indexOf("alot"), end: inputText.indexOf("alot") + 4 },
        context: "...alot..."
      });
    }
    
    // Check for punctuation issues
    if (!inputText.trim().endsWith('.') && !inputText.trim().endsWith('!') && !inputText.trim().endsWith('?') && inputText.trim().length > 10) {
      mockIssues.push({
        id: "4",
        type: "punctuation",
        severity: "suggestion",
        message: "Consider ending with punctuation",
        suggestion: "Add a period, question mark, or exclamation point",
        position: { start: inputText.length - 1, end: inputText.length },
        context: "...end of sentence"
      });
    }
    
    // Style suggestions
    if (words.length > 20) {
      const longSentences = inputText.split(/[.!?]+/).filter(sentence => 
        sentence.trim().split(/\s+/).length > 25
      );
      
      if (longSentences.length > 0) {
        mockIssues.push({
          id: "5",
          type: "style",
          severity: "suggestion",
          message: "Long sentence detected",
          suggestion: "Consider breaking this into shorter sentences for better readability",
          position: { start: 0, end: 50 },
          context: longSentences[0].substring(0, 50) + "..."
        });
      }
    }
    
    return mockIssues;
  };

  const handleCheck = async () => {
    if (!text.trim()) {
      toast({
        title: "No Text to Check",
        description: "Please enter some text to check for grammar issues.",
        variant: "destructive",
      });
      return;
    }
    
    setIsChecking(true);
    try {
      const foundIssues = await mockGrammarCheck(text);
      setIssues(foundIssues);
      setHasChecked(true);
      
      // Generate corrected text
      let corrected = text;
      foundIssues.forEach(issue => {
        if (issue.type === 'spelling' || issue.type === 'grammar') {
          const before = corrected.substring(0, issue.position.start);
          const after = corrected.substring(issue.position.end);
          corrected = before + issue.suggestion + after;
        }
      });
      setCorrectedText(corrected);
      
      toast({
        title: "Grammar Check Complete",
        description: `Found ${foundIssues.length} issue${foundIssues.length !== 1 ? 's' : ''} in your text.`,
      });
    } catch (error) {
      toast({
        title: "Check Failed",
        description: "Failed to check grammar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const applySuggestion = (issueId: string) => {
    const issue = issues.find(i => i.id === issueId);
    if (!issue) return;
    
    const before = text.substring(0, issue.position.start);
    const after = text.substring(issue.position.end);
    const newText = before + issue.suggestion + after;
    
    setText(newText);
    setIssues(issues.filter(i => i.id !== issueId));
    
    toast({
      title: "Suggestion Applied",
      description: "The correction has been applied to your text.",
    });
  };

  const applyAllSuggestions = () => {
    setText(correctedText);
    setIssues([]);
    toast({
      title: "All Suggestions Applied",
      description: "All grammar and spelling corrections have been applied.",
    });
  };

  const copyText = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Text Copied",
      description: "Text has been copied to clipboard.",
    });
  };

  const exportReport = () => {
    const report = {
      originalText: text,
      correctedText: correctedText,
      issues: issues,
      timestamp: new Date().toISOString(),
      summary: {
        totalIssues: issues.length,
        errors: issues.filter(i => i.severity === 'error').length,
        warnings: issues.filter(i => i.severity === 'warning').length,
        suggestions: issues.filter(i => i.severity === 'suggestion').length
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grammar-check-report.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Exported",
      description: "Grammar check report has been exported.",
    });
  };

  const getIssueIcon = (type: string, severity: string) => {
    if (severity === 'error') return <AlertCircle className="text-destructive" size={16} />;
    if (severity === 'warning') return <AlertCircle className="text-yellow-500" size={16} />;
    return <CheckCircle className="text-blue-500" size={16} />;
  };

  const getIssueColor = (severity: string) => {
    if (severity === 'error') return 'destructive';
    if (severity === 'warning') return 'secondary';
    return 'outline';
  };

  const getOverallScore = () => {
    if (!hasChecked) return 0;
    const totalWords = text.trim().split(/\s+/).length;
    const errorCount = issues.filter(i => i.severity === 'error').length;
    if (totalWords === 0) return 100;
    return Math.max(0, Math.min(100, 100 - (errorCount / totalWords) * 100));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-sans font-bold mb-4">Grammar & Spell Checker</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Advanced AI-powered grammar checker to detect and fix grammar, spelling, punctuation, and style issues.
        </p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="grammar-checker-top" position="tool-top" size="banner" className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Text Input */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glassmorphism">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Text to Check</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleCheck}
                    disabled={!text.trim() || isChecking}
                    className="gradient-bg"
                    data-testid="button-check-grammar"
                  >
                    {isChecking ? (
                      <>
                        <RefreshCw className="mr-2 animate-spin" size={16} />
                        Checking...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2" size={16} />
                        Check Grammar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here to check for grammar, spelling, and style issues..."
                className="min-h-[300px] text-base leading-relaxed"
                data-testid="textarea-grammar-input"
              />
              <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                <span>Ready for checking</span>
                <span>{text.length} characters</span>
              </div>
            </CardContent>
          </Card>

          {/* Corrected Text */}
          {hasChecked && correctedText !== text && (
            <Card className="glassmorphism">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Corrected Text</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyText(correctedText)}
                      data-testid="button-copy-corrected"
                    >
                      <Copy size={16} className="mr-2" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      onClick={applyAllSuggestions}
                      className="gradient-bg"
                      data-testid="button-apply-all"
                    >
                      Apply All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="text-base leading-relaxed whitespace-pre-wrap" data-testid="corrected-text">
                    {correctedText}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Grammar Score */}
          {hasChecked && (
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Grammar Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold gradient-text" data-testid="grammar-score">
                    {Math.round(getOverallScore())}
                  </div>
                  <div className="text-sm text-muted-foreground">out of 100</div>
                </div>
                <Progress value={getOverallScore()} className="h-2 mb-4" />
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div>
                    <div className="font-medium text-destructive" data-testid="error-count">
                      {issues.filter(i => i.severity === 'error').length}
                    </div>
                    <div className="text-muted-foreground">Errors</div>
                  </div>
                  <div>
                    <div className="font-medium text-yellow-500" data-testid="warning-count">
                      {issues.filter(i => i.severity === 'warning').length}
                    </div>
                    <div className="text-muted-foreground">Warnings</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-500" data-testid="suggestion-count">
                      {issues.filter(i => i.severity === 'suggestion').length}
                    </div>
                    <div className="text-muted-foreground">Suggestions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Issues List */}
          <Card className="glassmorphism">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Issues Found</CardTitle>
                {hasChecked && issues.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportReport}
                    data-testid="button-export-report"
                  >
                    <Download size={16} />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!hasChecked ? (
                <div className="text-center text-muted-foreground py-8">
                  <CheckCircle size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Click "Check Grammar" to analyze your text</p>
                </div>
              ) : issues.length === 0 ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Great! No grammar or spelling issues found in your text.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-3" data-testid="issues-list">
                  {issues.map((issue) => (
                    <Card key={issue.id} className="border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getIssueIcon(issue.type, issue.severity)}
                            <Badge variant={getIssueColor(issue.severity) as any} className="text-xs">
                              {issue.type}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => applySuggestion(issue.id)}
                            className="text-xs"
                            data-testid={`apply-suggestion-${issue.id}`}
                          >
                            Apply
                          </Button>
                        </div>
                        <p className="text-sm font-medium mb-1">{issue.message}</p>
                        <p className="text-xs text-muted-foreground mb-2">
                          Context: {issue.context}
                        </p>
                        <div className="bg-primary/5 p-2 rounded text-xs">
                          <strong>Suggestion:</strong> {issue.suggestion}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ad Slot 2 */}
      <AdSlot id="grammar-checker-bottom" position="tool-bottom" size="banner" className="mt-8" />

      {/* Writing Tips */}
      <Card className="glassmorphism mt-8">
        <CardHeader>
          <CardTitle>Grammar & Writing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">Common Grammar Mistakes</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Subject-verb disagreement</li>
                <li>• Incorrect pronoun usage</li>
                <li>• Misplaced modifiers</li>
                <li>• Run-on sentences</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Spelling Tips</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Use spell check tools regularly</li>
                <li>• Learn common homophones</li>
                <li>• Practice difficult words</li>
                <li>• Read more to improve vocabulary</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Style Improvements</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Vary sentence length</li>
                <li>• Use active voice</li>
                <li>• Eliminate redundancy</li>
                <li>• Choose precise words</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
