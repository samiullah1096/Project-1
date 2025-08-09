import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Copy, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdSlot from "@/components/AdSlot";

export default function Calculator() {
  const { toast } = useToast();
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState(0);
  const [isScientificMode, setIsScientificMode] = useState(false);

  // Unit converter states
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  useEffect(() => {
    document.title = "Calculator - ToolSuite Pro | Scientific Calculator & Unit Converter";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Advanced online calculator with scientific functions, unit converter, and calculation history. Perfect for students, engineers, and professionals.');
    }
  }, []);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Add to history
      const calculation = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [calculation, ...prev.slice(0, 9)]); // Keep last 10 calculations
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case "^":
        return Math.pow(firstValue, secondValue);
      case "%":
        return firstValue % secondValue;
      default:
        return secondValue;
    }
  };

  const calculate = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = performCalculation(previousValue, inputValue, operation);
      const calculation = `${previousValue} ${operation} ${inputValue} = ${newValue}`;
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      setHistory(prev => [calculation, ...prev.slice(0, 9)]);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const scientificFunction = (func: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (func) {
      case "sin":
        result = Math.sin(value * Math.PI / 180);
        break;
      case "cos":
        result = Math.cos(value * Math.PI / 180);
        break;
      case "tan":
        result = Math.tan(value * Math.PI / 180);
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "ln":
        result = Math.log(value);
        break;
      case "sqrt":
        result = Math.sqrt(value);
        break;
      case "square":
        result = value * value;
        break;
      case "inverse":
        result = value !== 0 ? 1 / value : 0;
        break;
      case "factorial":
        result = factorial(Math.floor(value));
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
    setHistory(prev => [`${func}(${value}) = ${result}`, ...prev.slice(0, 9)]);
  };

  const factorial = (n: number): number => {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const memoryOperation = (op: string) => {
    const value = parseFloat(display);
    
    switch (op) {
      case "MC":
        setMemory(0);
        toast({ title: "Memory Cleared" });
        break;
      case "MR":
        setDisplay(String(memory));
        setWaitingForOperand(true);
        break;
      case "MS":
        setMemory(value);
        toast({ title: "Memory Stored", description: `Value ${value} stored in memory` });
        break;
      case "M+":
        setMemory(memory + value);
        toast({ title: "Memory Added", description: `Added ${value} to memory` });
        break;
      case "M-":
        setMemory(memory - value);
        toast({ title: "Memory Subtracted", description: `Subtracted ${value} from memory` });
        break;
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(display);
    toast({
      title: "Result Copied",
      description: "Calculation result copied to clipboard.",
    });
  };

  // Unit conversion logic
  const conversions: { [key: string]: { [key: string]: number } } = {
    length: {
      meters: 1,
      feet: 3.28084,
      inches: 39.3701,
      centimeters: 100,
      kilometers: 0.001,
      miles: 0.000621371
    },
    weight: {
      kilograms: 1,
      pounds: 2.20462,
      ounces: 35.274,
      grams: 1000,
      tons: 0.001
    },
    temperature: {
      celsius: 1,
      fahrenheit: (c: number) => (c * 9/5) + 32,
      kelvin: (c: number) => c + 273.15
    }
  };

  const convertUnits = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) return;

    // Simple length conversion example
    const meterValue = value / conversions.length[fromUnit];
    const convertedValue = meterValue * conversions.length[toUnit];
    setToValue(convertedValue.toFixed(6));
  };

  useEffect(() => {
    convertUnits();
  }, [fromValue, fromUnit, toUnit]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-sans font-bold mb-4">Scientific Calculator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Advanced calculator with scientific functions, memory operations, and unit conversion capabilities.
        </p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="calculator-top" position="tool-top" size="banner" className="mb-8" />

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic" data-testid="tab-basic">Basic Calculator</TabsTrigger>
          <TabsTrigger value="scientific" data-testid="tab-scientific">Scientific</TabsTrigger>
          <TabsTrigger value="converter" data-testid="tab-converter">Unit Converter</TabsTrigger>
        </TabsList>

        {/* Basic Calculator */}
        <TabsContent value="basic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="glassmorphism">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Calculator</CardTitle>
                    <div className="flex items-center space-x-2">
                      {memory !== 0 && (
                        <Badge variant="secondary" data-testid="memory-indicator">
                          M: {memory}
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyResult}
                        data-testid="button-copy-result"
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Display */}
                  <div className="mb-6">
                    <div className="bg-muted/20 p-4 rounded-lg text-right">
                      <div className="text-3xl font-mono" data-testid="calculator-display">
                        {display}
                      </div>
                      {operation && (
                        <div className="text-sm text-muted-foreground">
                          {previousValue} {operation}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Memory Buttons */}
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {["MC", "MR", "MS", "M+", "M-"].map((btn) => (
                      <Button
                        key={btn}
                        variant="outline"
                        size="sm"
                        onClick={() => memoryOperation(btn)}
                        data-testid={`memory-${btn.toLowerCase()}`}
                      >
                        {btn}
                      </Button>
                    ))}
                  </div>

                  {/* Calculator Buttons */}
                  <div className="grid grid-cols-4 gap-3">
                    <Button
                      variant="outline"
                      onClick={clear}
                      className="text-destructive"
                      data-testid="button-clear"
                    >
                      C
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearEntry}
                      data-testid="button-clear-entry"
                    >
                      CE
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => inputOperation("%")}
                      data-testid="button-modulo"
                    >
                      %
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => inputOperation("÷")}
                      className="gradient-bg"
                      data-testid="button-divide"
                    >
                      ÷
                    </Button>

                    {/* Numbers and operations */}
                    {[
                      ["7", "8", "9", "×"],
                      ["4", "5", "6", "-"],
                      ["1", "2", "3", "+"],
                      ["0", ".", "=", "="]
                    ].map((row, i) => (
                      row.map((btn, j) => {
                        if (btn === "=") {
                          return j === 2 ? (
                            <Button
                              key={`${i}-${j}`}
                              onClick={calculate}
                              className="gradient-bg col-span-2"
                              data-testid="button-equals"
                            >
                              =
                            </Button>
                          ) : null;
                        }
                        
                        const isNumber = !isNaN(Number(btn));
                        const isOperation = ["×", "-", "+", "÷"].includes(btn);
                        
                        return (
                          <Button
                            key={`${i}-${j}`}
                            variant="outline"
                            onClick={() => {
                              if (btn === ".") {
                                inputDecimal();
                              } else if (isNumber) {
                                inputNumber(btn);
                              } else if (isOperation) {
                                inputOperation(btn);
                              }
                            }}
                            className={isOperation ? "gradient-bg" : ""}
                            data-testid={`button-${btn === "." ? "decimal" : btn}`}
                          >
                            {btn}
                          </Button>
                        );
                      })
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* History */}
            <div>
              <Card className="glassmorphism">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <History className="mr-2" size={20} />
                      History
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setHistory([])}
                      data-testid="button-clear-history"
                    >
                      <RotateCcw size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <p>No calculations yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2" data-testid="calculation-history">
                      {history.map((calc, index) => (
                        <div
                          key={index}
                          className="p-2 bg-muted/20 rounded text-sm font-mono cursor-pointer hover:bg-muted/30"
                          onClick={() => {
                            const result = calc.split("= ")[1];
                            if (result) {
                              setDisplay(result);
                              setWaitingForOperand(true);
                            }
                          }}
                          data-testid={`history-item-${index}`}
                        >
                          {calc}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Scientific Calculator */}
        <TabsContent value="scientific">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Scientific Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Display */}
                <div className="col-span-2 lg:col-span-3 mb-4">
                  <div className="bg-muted/20 p-4 rounded-lg text-right">
                    <div className="text-3xl font-mono" data-testid="scientific-display">
                      {display}
                    </div>
                  </div>
                </div>

                {/* Scientific Functions */}
                <div className="grid grid-cols-3 gap-2">
                  <h4 className="col-span-3 font-semibold mb-2">Trigonometric</h4>
                  {["sin", "cos", "tan"].map((func) => (
                    <Button
                      key={func}
                      variant="outline"
                      onClick={() => scientificFunction(func)}
                      data-testid={`button-${func}`}
                    >
                      {func}
                    </Button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <h4 className="col-span-3 font-semibold mb-2">Logarithmic</h4>
                  <Button
                    variant="outline"
                    onClick={() => scientificFunction("log")}
                    data-testid="button-log"
                  >
                    log
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scientificFunction("ln")}
                    data-testid="button-ln"
                  >
                    ln
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => inputOperation("^")}
                    data-testid="button-power"
                  >
                    x^y
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <h4 className="col-span-3 font-semibold mb-2">Other Functions</h4>
                  <Button
                    variant="outline"
                    onClick={() => scientificFunction("sqrt")}
                    data-testid="button-sqrt"
                  >
                    √x
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scientificFunction("square")}
                    data-testid="button-square"
                  >
                    x²
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scientificFunction("inverse")}
                    data-testid="button-inverse"
                  >
                    1/x
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => scientificFunction("factorial")}
                    data-testid="button-factorial"
                  >
                    x!
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDisplay(String(Math.PI))}
                    data-testid="button-pi"
                  >
                    π
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDisplay(String(Math.E))}
                    data-testid="button-e"
                  >
                    e
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Unit Converter */}
        <TabsContent value="converter">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Unit Converter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="from-value">From</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="from-value"
                      type="number"
                      value={fromValue}
                      onChange={(e) => setFromValue(e.target.value)}
                      placeholder="Enter value"
                      data-testid="input-from-value"
                    />
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="px-3 py-2 bg-background border border-border rounded-md"
                      data-testid="select-from-unit"
                    >
                      <option value="meters">Meters</option>
                      <option value="feet">Feet</option>
                      <option value="inches">Inches</option>
                      <option value="centimeters">Centimeters</option>
                      <option value="kilometers">Kilometers</option>
                      <option value="miles">Miles</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="to-value">To</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="to-value"
                      type="number"
                      value={toValue}
                      readOnly
                      className="bg-muted/20"
                      data-testid="input-to-value"
                    />
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="px-3 py-2 bg-background border border-border rounded-md"
                      data-testid="select-to-unit"
                    >
                      <option value="meters">Meters</option>
                      <option value="feet">Feet</option>
                      <option value="inches">Inches</option>
                      <option value="centimeters">Centimeters</option>
                      <option value="kilometers">Kilometers</option>
                      <option value="miles">Miles</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Common Conversions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-2">Length</h5>
                    <ul className="text-muted-foreground space-y-1">
                      <li>1 meter = 3.28 feet</li>
                      <li>1 kilometer = 0.62 miles</li>
                      <li>1 inch = 2.54 centimeters</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Weight</h5>
                    <ul className="text-muted-foreground space-y-1">
                      <li>1 kilogram = 2.20 pounds</li>
                      <li>1 pound = 16 ounces</li>
                      <li>1 ton = 1000 kilograms</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Temperature</h5>
                    <ul className="text-muted-foreground space-y-1">
                      <li>°F = (°C × 9/5) + 32</li>
                      <li>°C = (°F - 32) × 5/9</li>
                      <li>K = °C + 273.15</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ad Slot 2 */}
      <AdSlot id="calculator-bottom" position="tool-bottom" size="banner" className="mt-8" />
    </div>
  );
}
