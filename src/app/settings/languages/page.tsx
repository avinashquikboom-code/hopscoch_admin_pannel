'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2,
  Globe,
  DollarSign
} from 'lucide-react';

// Languages Initial Mock Data
const initialLanguages = [
  { id: '1', code: 'en', name: 'English', flag: '🇺🇸', isDefault: true, isEnabled: true },
  { id: '2', code: 'es', name: 'Spanish', flag: '🇪🇸', isDefault: false, isEnabled: true },
  { id: '3', code: 'fr', name: 'French', flag: '🇫🇷', isDefault: false, isEnabled: false },
  { id: '4', code: 'de', name: 'German', flag: '🇩🇪', isDefault: false, isEnabled: false },
];

// Currencies Initial Mock Data
const initialCurrencies = [
  { id: '1', code: 'USD', symbol: '$', name: 'US Dollar', exchangeRate: 1.00, isDefault: true, isEnabled: true },
  { id: '2', code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 0.92, isDefault: false, isEnabled: true },
  { id: '3', code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 0.79, isDefault: false, isEnabled: true },
  { id: '4', code: 'JPY', symbol: '¥', name: 'Japanese Yen', exchangeRate: 149.50, isDefault: false, isEnabled: false },
];

export default function LanguagesAndCurrencyPage() {
  const [languages, setLanguages] = useState(initialLanguages);
  const [currencies, setCurrencies] = useState(initialCurrencies);

  // Dialog & Form states for Language
  const [isLangDialogOpen, setIsLangDialogOpen] = useState(false);
  const [langForm, setLangForm] = useState({ name: '', code: '', flag: '🌐', isDefault: false });

  // Dialog & Form states for Currency
  const [isCurrDialogOpen, setIsCurrDialogOpen] = useState(false);
  const [currForm, setCurrForm] = useState({ name: '', code: '', symbol: '$', exchangeRate: 1.0, isDefault: false });

  // Language Handlers
  const handleCreateLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!langForm.name || !langForm.code) return;

    const newLang = {
      id: String(languages.length + 1),
      code: langForm.code.toLowerCase(),
      name: langForm.name,
      flag: langForm.flag,
      isDefault: langForm.isDefault,
      isEnabled: true,
    };

    let updatedLangs = [...languages];
    if (newLang.isDefault) {
      updatedLangs = updatedLangs.map((l) => ({ ...l, isDefault: false }));
    }
    setLanguages([...updatedLangs, newLang]);
    setLangForm({ name: '', code: '', flag: '🌐', isDefault: false });
    setIsLangDialogOpen(false);
  };

  const handleToggleLanguageStatus = (id: string) => {
    setLanguages(
      languages.map((l) => (l.id === id ? { ...l, isEnabled: !l.isEnabled } : l))
    );
  };

  const handleDeleteLanguage = (id: string) => {
    setLanguages(languages.filter((l) => l.id !== id));
  };

  // Currency Handlers
  const handleCreateCurrency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currForm.name || !currForm.code) return;

    const newCurr = {
      id: String(currencies.length + 1),
      code: currForm.code.toUpperCase(),
      symbol: currForm.symbol,
      name: currForm.name,
      exchangeRate: Number(currForm.exchangeRate),
      isDefault: currForm.isDefault,
      isEnabled: true,
    };

    let updatedCurrs = [...currencies];
    if (newCurr.isDefault) {
      updatedCurrs = updatedCurrs.map((c) => ({ ...c, isDefault: false }));
    }
    setCurrencies([...updatedCurrs, newCurr]);
    setCurrForm({ name: '', code: '', symbol: '$', exchangeRate: 1.0, isDefault: false });
    setIsCurrDialogOpen(false);
  };

  const handleToggleCurrencyStatus = (id: string) => {
    setCurrencies(
      currencies.map((c) => (c.id === id ? { ...c, isEnabled: !c.isEnabled } : c))
    );
  };

  const handleDeleteCurrency = (id: string) => {
    setCurrencies(currencies.filter((c) => c.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Languages & Currency</h1>
          <p className="text-muted-foreground mt-1 font-light">
            Manage multi-lingual store configurations, locale flags, standard currencies, and active exchange rates.
          </p>
        </div>

        <Tabs defaultValue="languages" className="space-y-6">
          <TabsList className="bg-muted/30 p-1 rounded-xl border border-border/40 w-fit">
            <TabsTrigger value="languages" className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" /> Languages
            </TabsTrigger>
            <TabsTrigger value="currencies" className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex items-center gap-2">
              <DollarSign className="h-3.5 w-3.5" /> Currencies
            </TabsTrigger>
          </TabsList>

          {/* Languages Tab Content */}
          <TabsContent value="languages" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-foreground">Supported Languages</h2>
              <Dialog open={isLangDialogOpen} onOpenChange={setIsLangDialogOpen}>
                <DialogTrigger render={
                  <Button className="rounded-xl flex items-center gap-2 cursor-pointer bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10">
                    <Plus className="h-4 w-4" /> Add Language
                  </Button>
                } />
                <DialogContent className="rounded-2xl max-w-md p-6 bg-card border border-border/60 shadow-xl backdrop-blur-md">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Add Language</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Configure a new language locale option for users.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateLanguage} className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="langName" className="text-xs font-semibold">Language Name</Label>
                      <Input
                        id="langName"
                        required
                        value={langForm.name}
                        onChange={(e) => setLangForm({ ...langForm, name: e.target.value })}
                        placeholder="e.g. Italian"
                        className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="langCode" className="text-xs font-semibold">Language Code (ISO)</Label>
                      <Input
                        id="langCode"
                        required
                        value={langForm.code}
                        onChange={(e) => setLangForm({ ...langForm, code: e.target.value })}
                        placeholder="e.g. it"
                        className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="langFlag" className="text-xs font-semibold">Emoji Flag</Label>
                      <Input
                        id="langFlag"
                        value={langForm.flag}
                        onChange={(e) => setLangForm({ ...langForm, flag: e.target.value })}
                        placeholder="e.g. 🇮🇹"
                        className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                      />
                    </div>
                    <div className="flex items-center gap-2.5 pt-2">
                      <input
                        id="langDefault"
                        type="checkbox"
                        checked={langForm.isDefault}
                        onChange={(e) => setLangForm({ ...langForm, isDefault: e.target.checked })}
                        className="rounded border-border/60 accent-primary h-4 w-4"
                      />
                      <Label htmlFor="langDefault" className="text-sm text-muted-foreground select-none cursor-pointer">
                        Set as default language
                      </Label>
                    </div>
                    <DialogFooter className="pt-4 flex gap-2 justify-end">
                      <Button type="button" variant="ghost" onClick={() => setIsLangDialogOpen(false)} className="rounded-xl">
                        Cancel
                      </Button>
                      <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10">
                        Save Language
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-border/40 rounded-2xl bg-card">
              <CardContent className="p-6">
                <div className="border border-border/40 rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead>Language Name</TableHead>
                        <TableHead>ISO Code</TableHead>
                        <TableHead className="text-center">Default</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="w-20"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {languages.map((l) => (
                        <TableRow key={l.id} className="hover:bg-muted/10">
                          <TableCell className="font-semibold text-sm text-foreground flex items-center gap-2">
                            <span className="text-lg">{l.flag}</span>
                            <span>{l.name}</span>
                          </TableCell>
                          <TableCell className="text-sm font-mono text-muted-foreground">{l.code}</TableCell>
                          <TableCell className="text-center">
                            {l.isDefault ? (
                              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent rounded-full px-2.5 py-0.5">
                                Default
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground/60 font-light">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={l.isEnabled}
                              onCheckedChange={() => handleToggleLanguageStatus(l.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger render={
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/60">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              } />
                              <DropdownMenuContent align="end" className="w-36 p-1 rounded-xl bg-card border border-border/60 shadow-lg">
                                <DropdownMenuItem className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer text-xs font-semibold flex items-center gap-2">
                                  <Edit className="h-3.5 w-3.5" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteLanguage(l.id)}
                                  className="p-2 rounded-lg text-destructive hover:bg-destructive/10 cursor-pointer text-xs font-semibold flex items-center gap-2"
                                >
                                  <Trash2 className="h-3.5 w-3.5" /> Delete
                                </DropdownMenuItem>
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
          </TabsContent>

          {/* Currencies Tab Content */}
          <TabsContent value="currencies" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-foreground">Supported Currencies</h2>
              <Dialog open={isCurrDialogOpen} onOpenChange={setIsCurrDialogOpen}>
                <DialogTrigger render={
                  <Button className="rounded-xl flex items-center gap-2 cursor-pointer bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10">
                    <Plus className="h-4 w-4" /> Add Currency
                  </Button>
                } />
                <DialogContent className="rounded-2xl max-w-md p-6 bg-card border border-border/60 shadow-xl backdrop-blur-md">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Add Currency</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Configure a new currency option and standard exchange rates.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateCurrency} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currCode" className="text-xs font-semibold">Currency Code (ISO)</Label>
                        <Input
                          id="currCode"
                          required
                          value={currForm.code}
                          onChange={(e) => setCurrForm({ ...currForm, code: e.target.value })}
                          placeholder="e.g. CAD"
                          className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currSymbol" className="text-xs font-semibold">Symbol</Label>
                        <Input
                          id="currSymbol"
                          required
                          value={currForm.symbol}
                          onChange={(e) => setCurrForm({ ...currForm, symbol: e.target.value })}
                          placeholder="e.g. C$"
                          className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currName" className="text-xs font-semibold">Currency Name</Label>
                      <Input
                        id="currName"
                        required
                        value={currForm.name}
                        onChange={(e) => setCurrForm({ ...currForm, name: e.target.value })}
                        placeholder="e.g. Canadian Dollar"
                        className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currRate" className="text-xs font-semibold">Exchange Rate (USD = 1.0)</Label>
                      <Input
                        id="currRate"
                        type="number"
                        step="0.0001"
                        required
                        value={currForm.exchangeRate}
                        onChange={(e) => setCurrForm({ ...currForm, exchangeRate: Number(e.target.value) })}
                        className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                      />
                    </div>
                    <div className="flex items-center gap-2.5 pt-2">
                      <input
                        id="currDefault"
                        type="checkbox"
                        checked={currForm.isDefault}
                        onChange={(e) => setCurrForm({ ...currForm, isDefault: e.target.checked })}
                        className="rounded border-border/60 accent-primary h-4 w-4"
                      />
                      <Label htmlFor="currDefault" className="text-sm text-muted-foreground select-none cursor-pointer">
                        Set as default currency
                      </Label>
                    </div>
                    <DialogFooter className="pt-4 flex gap-2 justify-end">
                      <Button type="button" variant="ghost" onClick={() => setIsCurrDialogOpen(false)} className="rounded-xl">
                        Cancel
                      </Button>
                      <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10">
                        Save Currency
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-border/40 rounded-2xl bg-card">
              <CardContent className="p-6">
                <div className="border border-border/40 rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead>Currency Code</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Exchange Rate</TableHead>
                        <TableHead className="text-center">Default</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="w-20"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currencies.map((c) => (
                        <TableRow key={c.id} className="hover:bg-muted/10">
                          <TableCell className="font-semibold text-sm text-foreground">{c.code}</TableCell>
                          <TableCell className="text-sm font-mono font-semibold text-muted-foreground">{c.symbol}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{c.name}</TableCell>
                          <TableCell className="text-right text-sm font-semibold">{c.exchangeRate.toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            {c.isDefault ? (
                              <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent rounded-full px-2.5 py-0.5">
                                Default
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground/60 font-light">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={c.isEnabled}
                              onCheckedChange={() => handleToggleCurrencyStatus(c.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger render={
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/60">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              } />
                              <DropdownMenuContent align="end" className="w-36 p-1 rounded-xl bg-card border border-border/60 shadow-lg">
                                <DropdownMenuItem className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer text-xs font-semibold flex items-center gap-2">
                                  <Edit className="h-3.5 w-3.5" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteCurrency(c.id)}
                                  className="p-2 rounded-lg text-destructive hover:bg-destructive/10 cursor-pointer text-xs font-semibold flex items-center gap-2"
                                >
                                  <Trash2 className="h-3.5 w-3.5" /> Delete
                                </DropdownMenuItem>
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
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
