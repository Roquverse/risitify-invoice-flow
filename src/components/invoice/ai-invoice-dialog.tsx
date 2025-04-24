
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wand } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AiInvoiceDialog() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerateInvoice = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate invoice");

      const data = await response.json();
      console.log("Generated invoice data:", data);
      
      // Navigate to create invoice page with the generated data
      navigate("/dashboard/sales/invoices/create", { 
        state: { aiGeneratedData: data.generatedText } 
      });

      toast({
        title: "Invoice Generated",
        description: "Your AI-generated invoice is ready to review.",
      });
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast({
        title: "Error",
        description: "Failed to generate invoice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Wand className="w-4 h-4 mr-2" />
          Create with AI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Invoice with AI</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Describe the invoice you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              Example: "Create an invoice for web development services including hosting and maintenance for the month of March"
            </p>
          </div>
          <Button 
            onClick={handleGenerateInvoice} 
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Invoice"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
