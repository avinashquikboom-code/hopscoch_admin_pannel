'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2,
  Globe,
  Check,
  X
} from 'lucide-react';

const languages = [
  {
    id: '1',
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    isDefault: true,
    isEnabled: true,
    translations: {
      'welcome': 'Welcome',
      'shop_now': 'Shop Now',
      'add_to_cart': 'Add to Cart',
    },
  },
  {
    id: '2',
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸',
    isDefault: false,
    isEnabled: true,
    translations: {
      'welcome': 'Bienvenido',
      'shop_now': 'Comprar Ahora',
      'add_to_cart': 'Añadir al Carrito',
    },
  },
  {
    id: '3',
    code: 'fr',
    name: 'French',
    flag: '🇫🇷',
    isDefault: false,
    isEnabled: false,
    translations: {
      'welcome': 'Bienvenue',
      'shop_now': 'Acheter Maintenant',
      'add_to_cart': 'Ajouter au Panier',
    },
  },
  {
    id: '4',
    code: 'de',
    name: 'German',
    flag: '🇩🇪',
    isDefault: false,
    isEnabled: false,
    translations: {
      'welcome': 'Willkommen',
      'shop_now': 'Jetzt Einkaufen',
      'add_to_cart': 'In den Warenkorb',
    },
  },
];

export default function LanguagesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Languages</h1>
            <p className="text-muted-foreground mt-1">Manage supported languages</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button className="bg-primary hover:bg-primary-dark">
                <Plus className="mr-2 h-4 w-4" />
                Add Language
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Language</DialogTitle>
                <DialogDescription>
                  Add a new language to your store
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Language Name *</Label>
                  <Input id="name" placeholder="e.g., Spanish" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Language Code *</Label>
                  <Input id="code" placeholder="e.g., es" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flag">Flag Emoji</Label>
                  <Input id="flag" placeholder="e.g., 🇪🇸" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="enabled" defaultChecked />
                  <Label htmlFor="enabled">Enable immediately</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary-dark">
                  Add Language
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Languages</p>
                  <p className="text-2xl font-bold">{languages.length}</p>
                </div>
                <Globe className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Enabled</p>
                  <p className="text-2xl font-bold text-success">
                    {languages.filter(l => l.isEnabled).length}
                  </p>
                </div>
                <Check className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Default</p>
                  <p className="text-2xl font-bold text-primary">
                    {languages.find(l => l.isDefault)?.name || 'None'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Languages Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Language</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Translations</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languages.map((language) => (
                    <TableRow key={language.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{language.flag}</span>
                          <span className="font-medium">{language.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{language.code}</TableCell>
                      <TableCell>
                        {language.isEnabled ? (
                          <Badge className="bg-success/10 text-success">Enabled</Badge>
                        ) : (
                          <Badge variant="secondary">Disabled</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {language.isDefault ? (
                          <Badge className="bg-primary/10 text-primary">Default</Badge>
                        ) : (
                          <Button variant="ghost" size="sm">
                            Set Default
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          {Object.keys(language.translations).length} keys
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Translations
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {language.isEnabled ? (
                                <X className="mr-2 h-4 w-4" />
                              ) : (
                                <Check className="mr-2 h-4 w-4" />
                              )}
                              {language.isEnabled ? 'Disable' : 'Enable'}
                            </DropdownMenuItem>
                            {!language.isDefault && (
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
