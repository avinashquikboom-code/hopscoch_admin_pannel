'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload,
  Search,
  Image as ImageIcon,
  Sparkles,
  Eye,
  Trash2,
  CheckCircle
} from 'lucide-react';

const visualSearches = [
  {
    id: '1',
    productId: 'PROD-001',
    productName: 'Summer Floral Dress',
    imageUrl: '/product-1.jpg',
    metadata: {
      colors: ['red', 'pink', 'white'],
      patterns: ['floral', 'printed'],
      style: ['casual', 'summer'],
      category: 'dresses',
      confidence: 0.95,
    },
    similarProducts: ['PROD-002', 'PROD-003', 'PROD-004'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    productId: 'PROD-002',
    productName: 'Classic White Blouse',
    imageUrl: '/product-2.jpg',
    metadata: {
      colors: ['white', 'cream'],
      patterns: ['solid'],
      style: ['formal', 'office'],
      category: 'tops',
      confidence: 0.92,
    },
    similarProducts: ['PROD-005', 'PROD-006'],
    createdAt: '2024-01-14',
  },
];

export default function VisualSearchPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Visual Search</h1>
          <p className="text-muted-foreground mt-1">AI-powered visual search management</p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Product Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop product image or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                AI will automatically extract colors, patterns, and style metadata
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="outline" className="mt-4">
                  Choose Image
                </Button>
              </label>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={isProcessing}
                  className="bg-primary hover:bg-primary-dark"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Metadata
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Indexed Products</p>
                  <p className="text-2xl font-bold">{visualSearches.length}</p>
                </div>
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Confidence</p>
                  <p className="text-2xl font-bold text-success">
                    {(visualSearches.reduce((acc, v) => acc + v.metadata.confidence, 0) / visualSearches.length * 100).toFixed(0)}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Colors Extracted</p>
                  <p className="text-2xl font-bold text-primary">
                    {visualSearches.reduce((acc, v) => acc + v.metadata.colors.length, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Similar Products</p>
                  <p className="text-2xl font-bold text-warning">
                    {visualSearches.reduce((acc, v) => acc + v.similarProducts.length, 0)}
                  </p>
                </div>
                <Search className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visual Search Results */}
        <Card>
          <CardHeader>
            <CardTitle>Indexed Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visualSearches.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex gap-4">
                    <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-semibold">{item.productName}</h3>
                        <p className="text-sm text-muted-foreground">{item.productId}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Colors</Label>
                          <div className="flex gap-1 mt-1">
                            {item.metadata.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded border"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Patterns</Label>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {item.metadata.patterns.map((pattern, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {pattern}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Style</Label>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {item.metadata.style.map((style, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {style}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Confidence</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-success"
                                style={{ width: `${item.metadata.confidence * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {(item.metadata.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">Similar Products</Label>
                        <div className="flex gap-2 mt-1">
                          {item.similarProducts.map((productId, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {productId}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="mr-2 h-4 w-4" />
                        Test Search
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
