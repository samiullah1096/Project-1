import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Copy, Download, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdSlot from "@/components/AdSlot";

export default function WordCounter() {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
    mostCommonWords: [] as Array<{ word: string; count: number }>,
    averageWordsPerSentence: 0,
    averageSentencesPerParagraph: 0
  });

  useEffect(() => {
    document.title = "Word Counter - ToolSuite Pro | Count Words, Characters, Sentences";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional word counter tool to count words, characters, sentences, and paragraphs. Get reading time estimates and text analysis for free.');
    }
  }, []);

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (inputText: string) => {
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // Words count
    const words = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Sentences count
    const sentences = inputText.trim() === '' ? 0 : inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    
    // Paragraphs count
    const paragraphs = inputText.trim() === '' ? 0 : inputText.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    
    // Reading time (assuming 200 words per minute)
    const readingTime = words / 200;
    
    // Speaking time (assuming 130 words per minute)
    const speakingTime = words / 130;
    
    // Most common words
    const wordArray = inputText.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount: { [key: string]: number } = {};
    
    wordArray.forEach(word => {
      if (word.length > 2) { // Only count words longer than 2 characters
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    const mostCommonWords = Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));
    
    // Average calculations
    const averageWordsPerSentence = sentences > 0 ? words / sentences : 0;
    const averageSentencesPerParagraph = paragraphs > 0 ? sentences / paragraphs : 0;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      mostCommonWords,
      averageWordsPerSentence,
      averageSentencesPerParagraph
    });
  };

  const handleClear = () => {
    setText("");
    toast({
      title: "Text Cleared",
      description: "The text area has been cleared.",
    });
  };

  const handleCopyStats = () => {
    const statsText = `
Text Statistics:
- Characters: ${stats.characters}
- Characters (no spaces): ${stats.charactersNoSpaces}
- Words: ${stats.words}
- Sentences: ${stats.sentences}
- Paragraphs: ${stats.paragraphs}
- Reading time: ${Math.ceil(stats.readingTime)} minutes
- Speaking time: ${Math.ceil(stats.speakingTime)} minutes
    `.trim();
    
    navigator.clipboard.writeText(statsText);
    toast({
      title: "Statistics Copied",
      description: "Text statistics have been copied to clipboard.",
    });
  };

  const handleExportStats = () => {
    const statsData = {
      text: text.substring(0, 100) + (text.length > 100 ? "..." : ""),
      timestamp: new Date().toISOString(),
      statistics: stats
    };
    
    const blob = new Blob([JSON.stringify(statsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Statistics Exported",
      description: "Text analysis has been exported as JSON file.",
    });
  };

  const getReadabilityScore = () => {
    if (stats.words === 0) return 0;
    
    // Simple readability score based on average words per sentence and syllables
    const avgWordsPerSentence = stats.averageWordsPerSentence;
    
    if (avgWordsPerSentence <= 14) return 90; // Very Easy
    if (avgWordsPerSentence <= 18) return 80; // Easy
    if (avgWordsPerSentence <= 21) return 70; // Fairly Easy
    if (avgWordsPerSentence <= 25) return 60; // Standard
    if (avgWordsPerSentence <= 30) return 50; // Fairly Difficult
    return 30; // Difficult
  };

  const getReadabilityLevel = (score: number) => {
    if (score >= 90) return "Very Easy";
    if (score >= 80) return "Easy";
    if (score >= 70) return "Fairly Easy";
    if (score >= 60) return "Standard";
    if (score >= 50) return "Fairly Difficult";
    return "Difficult";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-sans font-bold mb-4">Word Counter & Text Analyzer</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Analyze your text with detailed statistics including word count, reading time, and readability score.
        </p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="word-counter-top" position="tool-top" size="banner" className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <Card className="glassmorphism">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Text Input</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    disabled={!text}
                    data-testid="button-clear"
                  >
                    <RotateCcw className="mr-2" size={16} />
                    Clear
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here to analyze..."
                className="min-h-[400px] text-base leading-relaxed"
                data-testid="textarea-text-input"
              />
              <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                <span>Real-time analysis</span>
                <span>{stats.characters} characters</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Panel */}
        <div className="space-y-6">
          {/* Basic Stats */}
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Basic Statistics
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyStats}
                  data-testid="button-copy-stats"
                >
                  <Copy size={16} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-characters">
                    {stats.characters.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success" data-testid="stat-words">
                    {stats.words.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent" data-testid="stat-sentences">
                    {stats.sentences.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Sentences</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary" data-testid="stat-paragraphs">
                    {stats.paragraphs.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Paragraphs</div>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Characters (no spaces):</span>
                    <span className="font-medium" data-testid="stat-characters-no-spaces">
                      {stats.charactersNoSpaces.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reading time:</span>
                    <span className="font-medium" data-testid="stat-reading-time">
                      {Math.ceil(stats.readingTime)} min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speaking time:</span>
                    <span className="font-medium" data-testid="stat-speaking-time">
                      {Math.ceil(stats.speakingTime)} min
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Readability Score */}
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Readability Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Readability Score</span>
                    <Badge variant="secondary" data-testid="readability-level">
                      {getReadabilityLevel(getReadabilityScore())}
                    </Badge>
                  </div>
                  <Progress value={getReadabilityScore()} className="h-2" data-testid="readability-progress" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {getReadabilityScore()}/100
                  </div>
                </div>
                
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Avg words per sentence:</span>
                    <span className="font-medium" data-testid="avg-words-sentence">
                      {stats.averageWordsPerSentence.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg sentences per paragraph:</span>
                    <span className="font-medium" data-testid="avg-sentences-paragraph">
                      {stats.averageSentencesPerParagraph.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Most Common Words */}
          {stats.mostCommonWords.length > 0 && (
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Most Common Words</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.mostCommonWords.map((item, index) => (
                    <div key={index} className="flex justify-between items-center" data-testid={`common-word-${index}`}>
                      <span className="font-medium">{item.word}</span>
                      <Badge variant="outline">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Export Options */}
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Export Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleExportStats}
                className="w-full gradient-bg"
                disabled={!text}
                data-testid="button-export"
              >
                <Download className="mr-2" size={16} />
                Export as JSON
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Download detailed text analysis including all statistics and metadata.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ad Slot 2 */}
      <AdSlot id="word-counter-bottom" position="tool-bottom" size="banner" className="mt-8" />

      {/* Writing Tips */}
      <Card className="glassmorphism mt-8">
        <CardHeader>
          <CardTitle>Writing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">Readability</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Keep sentences under 20 words</li>
                <li>• Use simple, common words</li>
                <li>• Break up long paragraphs</li>
                <li>• Use active voice</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">SEO Writing</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Target 300+ words for blog posts</li>
                <li>• Use keywords naturally</li>
                <li>• Include subheadings</li>
                <li>• Write compelling meta descriptions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Reading Time</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Average: 200-250 words/minute</li>
                <li>• Blog posts: 3-7 minutes ideal</li>
                <li>• Social media: Under 1 minute</li>
                <li>• Technical content: Allow more time</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
