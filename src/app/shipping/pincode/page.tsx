'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Upload, MapPin, CheckCircle2, XCircle, Filter } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';

const pincodes = [
  { pin: '400001', city: 'Mumbai', state: 'MH', cod: true, express: true, active: true },
  { pin: '400002', city: 'Mumbai', state: 'MH', cod: true, express: true, active: true },
  { pin: '110001', city: 'New Delhi', state: 'DL', cod: true, express: true, active: true },
  { pin: '560001', city: 'Bangalore', state: 'KA', cod: true, express: false, active: true },
  { pin: '600001', city: 'Chennai', state: 'TN', cod: true, express: false, active: true },
  { pin: '500001', city: 'Hyderabad', state: 'TS', cod: false, express: false, active: true },
  { pin: '700001', city: 'Kolkata', state: 'WB', cod: true, express: false, active: true },
  { pin: '302001', city: 'Jaipur', state: 'RJ', cod: true, express: false, active: false },
  { pin: '380001', city: 'Ahmedabad', state: 'GJ', cod: true, express: true, active: true },
  { pin: '800001', city: 'Patna', state: 'BR', cod: false, express: false, active: false },
];

const Tick = ({ val }: { val: boolean }) =>
  val ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-rose-400" />;

export default function PincodePage() {
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = pincodes.filter(p => {
    const matchSearch = p.pin.includes(search) || p.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterActive === 'all' || (filterActive === 'active' ? p.active : !p.active);
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Shipping"
          titlePart2="Pincode Serviceability"
          badgeText="Logistics Command Center"
          subtitle="Manage serviceable pincodes, COD, and express availability."
          showClock={true}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-md gap-2 text-sm border-border/60 cursor-pointer">
                <Upload className="h-4 w-4" /> Upload CSV
              </Button>
              <Button className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/10 cursor-pointer">
                <MapPin className="h-4 w-4" /> Add Pincode
              </Button>
            </div>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Pincodes', value: pincodes.length, color: 'text-[#14b8a6]' },
            { label: 'Active', value: pincodes.filter(p => p.active).length, color: 'text-emerald-500' },
            { label: 'COD Available', value: pincodes.filter(p => p.cod).length, color: 'text-amber-500' },
            { label: 'Express Available', value: pincodes.filter(p => p.express).length, color: 'text-violet-500' },
          ].map(s => (
            <Card key={s.label} className="border-border/40 bg-card rounded-lg">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{s.label}</p>
                <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input placeholder="Search pincode or city..." value={search} onChange={e => setSearch(e.target.value)} className="pl-11 h-10 rounded-md border-border/60" />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'inactive'] as const).map(f => (
              <Button key={f} size="sm" variant={filterActive === f ? 'default' : 'outline'}
                onClick={() => setFilterActive(f)}
                className={`rounded-md capitalize text-xs ${filterActive === f ? 'bg-primary text-white' : 'border-border/60'}`}>
                <Filter className="h-3 w-3 mr-1" />{f}
              </Button>
            ))}
          </div>
        </div>

        <Card className="border-border/40 rounded-lg bg-card">
          <CardHeader><CardTitle className="text-sm font-bold">Pincode List ({filtered.length})</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    {['Pincode', 'City', 'State', 'COD', 'Express', 'Status', 'Actions'].map(h => (
                      <TableHead key={h} className="text-xs font-bold uppercase tracking-wider">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow key={p.pin} className="hover:bg-muted/10">
                      <TableCell className="font-mono font-bold text-sm text-[#14b8a6]">{p.pin}</TableCell>
                      <TableCell className="text-sm font-semibold">{p.city}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.state}</TableCell>
                      <TableCell><Tick val={p.cod} /></TableCell>
                      <TableCell><Tick val={p.express} /></TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] rounded-full px-2.5 border-transparent font-semibold ${p.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                          {p.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-7 text-xs rounded-md">
                          {p.active ? 'Disable' : 'Enable'}
                        </Button>
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
