/*"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import GeneViewer from "~/components/gene-viewer";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getAvailableGenomes, getGenomeChromosomes, searchGenes, type ChromosomeFromSeach, type GeneFromSearch, type GenomeAssemblyFromSearch } from "~/utils/genome-api";

type Mode = "search" | "browse";



export default function HomePage() {

  const [genomes, setGenomes] = useState<GenomeAssemblyFromSearch[]>([]);
  const [selectedGenome, setSelectedGenome] = useState<string>("hg38");
  const [chromosomes, setChromosomes] = useState<ChromosomeFromSeach[]>([]);
  const [selectedChromosome, setSelectedChromosome] = useState<string>("chr1");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GeneFromSearch[]>([]);
  const [selectedGene, setSelectedGene] = useState<GeneFromSearch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("search");

  useEffect(() => {
    const fetchGenomes = async () => {
      try {
        setIsLoading(true);
        const data = await getAvailableGenomes();
        if (data.genomes && data.genomes["Human"]) {
          setGenomes(data.genomes["Human"]);
        }
      } catch (err) {
        setError("Failed to load genome data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenomes();
  }, []);


  useEffect(() => {
    const fetchChromosomes = async () => {
      try {
        setIsLoading(true);
        const data = await getGenomeChromosomes(selectedGenome);
        setChromosomes(data.chromosomes);
        console.log(data.chromosomes);
        if (data.chromosomes.length > 0) {
          setSelectedChromosome(data.chromosomes[0]!.name);
        }
      } catch (err) {
        setError("Failed to load chromosome data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchChromosomes();
  }, [selectedGenome]);



  const performGeneSearch = async (
    query: string,
    genome: string,
    filterFn?: (gene: GeneFromSearch) => boolean,
  ) => {
    try {
      setIsLoading(true);
      const data = await searchGenes(query, genome);
      const results = filterFn ? data.results.filter(filterFn) : data.results;
      
      setSearchResults(results);
    } catch (err) {
      setError("Faield to search genes");
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    if (!selectedChromosome || mode !== "browse") return;
    performGeneSearch(
      selectedChromosome,
      selectedGenome,
      (gene: GeneFromSearch) => gene.chrom === selectedChromosome,
    );
  }, [selectedChromosome, selectedGenome, mode]);



  const handleGenomeChange = (value: string) => {
    setSelectedGenome(value);
    setSearchResults([]);
    setSelectedGene(null);
  };



  const switchMode = (newMode: Mode) => {
    if (newMode === mode) return;

    setSearchResults([]);
    setSelectedGene(null);
    setError(null);

    if (newMode === "browse" && selectedChromosome) {
      performGeneSearch(
        selectedChromosome,
        selectedGenome,
        (gene: GeneFromSearch) => gene.chrom === selectedChromosome,
      );
    }

    setMode(newMode);
  };



  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    performGeneSearch(searchQuery, selectedGenome);
  };


  const loadBRCA1Example = () => {
    setMode("search");
    setSearchQuery("BRCA1");
    performGeneSearch("BRCA1", selectedGenome);
  };


  return (
    <div className="bg-[#e9eeea] min-h-screen">
      <header className="border-b border-[#3c4f3d]/10 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <h1 className="text-xl font-light tracking-wide text-[#3c4f3d]">
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                  Gene-Sage-AI
                </span>
              </h1>
            </div>
            <span className="text-sm font-light text-[#3c4f3d]/70">
             Evo2 Variant Analysis
            </span>
          </div>
        </div>
      </header>


      <main className="container mx-auto px-6 py-6">

        {selectedGene ?( 
          <GeneViewer
            gene={selectedGene}
            genomeId={selectedGenome}
            onClose={() => setSelectedGene(null)}
          />
        ):(
        <>
          <Card className="mb-6 gap-0 border-none bg-white py-0 shadow-sm">
            <CardHeader className="pt-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-normal text-[#3c4f3d]/70">
                    Genome Assembly
                </CardTitle>
                <div className="text-xs text-[#3c4f3d]/60">
                  Organism: <span className="font-medium">Human</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-4">
              <Select
                value={selectedGenome}
                onValueChange={handleGenomeChange}
                disabled={isLoading}
              >
                <SelectTrigger className="h-9 w-full border-[#3c4f3d]/10">
                  <SelectValue placeholder="Select genome assembly" />
                </SelectTrigger>

                <SelectContent>
                  {genomes.map((genome) => (
                    <SelectItem key={genome.id} value={genome.id}>
                      {genome.id} - {genome.name}
                      {genome.active ? " (active)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedGenome && (
                <p className="mt-2 text-xs text-[#3c4f3d]/60">
                  {
                    genomes.find((genome) => genome.id === selectedGenome)
                      ?.sourceName
                  }
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6 gap-0 border-none bg-white py-0 shadow-sm">
              <CardHeader className="pt-4 pb-2">
                <CardTitle className="text-sm font-normal text-[#3c4f3d]/70">
                  Browse
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-4">
                <Tabs
                  value={mode}
                  onValueChange={(value) => switchMode(value as Mode)}
                >
                  <TabsList className="mb-4 bg-[#e9eeea]">
                    <TabsTrigger 
                      className="data-[state=active]:bg-white data-[state=active]:text-[#3c4f3d]"
                      value="search"
                    >
                      Search Genes
                    </TabsTrigger>
                    <TabsTrigger
                      className="data-[state=active]:bg-white data-[state=active]:text-[#3c4f3d]"
                      value="browse"
                    >
                      Browse Chromosomes
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="search" className="mt-0">
                    <div className="space-y-4">
                      <form
                        onSubmit={handleSearch}
                        className="flex flex-col gap-3 sm:flex-row"
                      >
                        <div className="relative flex-1">
                          <Input
                            type="text"
                            placeholder="Enter gene symbol or name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 border-[#3c4f3d]/10 pr-10"
                          />
                          <Button
                            type="submit"
                            className="absolute top-0 right-0 h-full cursor-pointer rounded-l-none bg-[#3c4f3d] text-white hover:bg-[#3c4f3d]/90"
                            size="icon"
                            disabled={isLoading || !searchQuery.trim()}
                          >
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                          </Button>
                        </div>
                      </form>
                      <Button
                        variant="link"
                        className="h-auto cursor-pointer p-0 text-[#de8246] hover:text-[#de8246]/80"
                        onClick={loadBRCA1Example}
                      >
                        Try BRCA1 example
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="browse" className="mt-0">
                    <div className="max-h-[150px] overflow-y-auto pr-1">
                      <div className="flex flex-wrap gap-2">
                        {chromosomes.map((chrom) => (
                          <Button
                            key={chrom.name}
                            variant="outline"
                            size="sm"
                            className={`h-8 cursor-pointer border-[#3c4f3d]/10 hover:bg-[#e9eeea] hover:text-[#3c4f3d] ${selectedChromosome === chrom.name ? "text[#3c4f3d] bg-[#e9eeea]" : ""}`}
                            onClick={() => setSelectedChromosome(chrom.name)}
                          >
                            {chrom.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {isLoading && (
                  <div className="flex justify-center py-4">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#3c4f3d]/30 border-t-[#de8243]"></div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}


                {searchResults.length > 0 && !isLoading && (
                    <div className="mt-6">
                      <div className="mb-2">
                        <h4 className="text-xs font-normal text-[#3c4f3d]/70">
                          {mode === "search" ? (
                            <>
                              Search Results:{" "}
                              <span className="font-medium text-[#3c4f3d]">
                                {searchResults.length} genes
                              </span>
                            </>
                          ) : (
                            <>
                              Genes on {selectedChromosome}:{" "}
                              <span className="font-medium text-[#3c4f3d]">
                                {searchResults.length} found
                              </span>
                            </>
                          )}
                        </h4>
                      </div>


                      <div className="overflow-hidden rounded-md border border-[#3c4f3d]/5">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-[#e9eeea]/50 hover:bg-[e9eeea]/70">
                              <TableHead className="text-xs font-normal text-[#3c4f3d]/70">
                                Symbol
                              </TableHead>
                              <TableHead className="text-xs font-normal text-[#3c4f3d]/70">
                                Name
                              </TableHead>
                              <TableHead className="text-xs font-normal text-[#3c4f3d]/70">
                                Location
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {searchResults.map((gene, index) => (
                              <TableRow
                                key={`${gene.symbol}-${index}`}
                                className="cursor-pointer border-b border-[#3c4f3d]/5 hover:bg-[#e9eeea]/50"
                                onClick={() => setSelectedGene(gene)}
                              >
                                <TableCell className="py-2 font-medium text-[#3c4f3d]">
                                  {gene.symbol}
                                </TableCell>
                                <TableCell className="py-2 font-medium text-[#3c4f3d]">
                                  {gene.name}
                                </TableCell>
                                <TableCell className="py-2 font-medium text-[#3c4f3d]">
                                  {gene.chrom}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                )}

                {!isLoading && !error && searchResults.length === 0 && (
                  <div className="flex h-48 flex-col items-center justify-center text-center text-gray-400">
                    <Search className="mb-4 h-10 w-10 text-gray-400" />
                    <p className="text-sm leading-relaxed">
                      {mode === "search"
                        ? "Enter a gene or symbol and click search"
                        : selectedChromosome
                          ? "No genes found on this chromosome"
                          : "Select a chromosome to view genes"}
                    </p>
                  </div>
                )}

              </CardContent>

              
          </Card>
        </>
      )}

        



      </main>

    </div>
  );
}
*/


"use client";
import { Search, Dna, Brain, Globe, Database } from "lucide-react";
import { useEffect, useState } from "react";
import GeneViewer from "~/components/gene-viewer";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import { getAvailableGenomes, getGenomeChromosomes, searchGenes, type ChromosomeFromSeach, type GeneFromSearch, type GenomeAssemblyFromSearch } from "~/utils/genome-api";

type Mode = "search" | "browse";

export default function HomePage() {
  const [genomes, setGenomes] = useState<GenomeAssemblyFromSearch[]>([]);
  const [selectedGenome, setSelectedGenome] = useState<string>("hg38");
  const [chromosomes, setChromosomes] = useState<ChromosomeFromSeach[]>([]);
  const [selectedChromosome, setSelectedChromosome] = useState<string>("chr1");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GeneFromSearch[]>([]);
  const [selectedGene, setSelectedGene] = useState<GeneFromSearch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("search");

  useEffect(() => {
    const fetchGenomes = async () => {
      try {
        setIsLoading(true);
        const data = await getAvailableGenomes();
        if (data.genomes && data.genomes["Human"]) {
          setGenomes(data.genomes["Human"]);
        }
      } catch (err) {
        setError("Failed to load genome data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenomes();
  }, []);

  useEffect(() => {
    const fetchChromosomes = async () => {
      try {
        setIsLoading(true);
        const data = await getGenomeChromosomes(selectedGenome);
        setChromosomes(data.chromosomes);
        console.log(data.chromosomes);
        if (data.chromosomes.length > 0) {
          setSelectedChromosome(data.chromosomes[0]!.name);
        }
      } catch (err) {
        setError("Failed to load chromosome data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchChromosomes();
  }, [selectedGenome]);

  const performGeneSearch = async (
    query: string,
    genome: string,
    filterFn?: (gene: GeneFromSearch) => boolean,
  ) => {
    try {
      setIsLoading(true);
      const data = await searchGenes(query, genome);
      const results = filterFn ? data.results.filter(filterFn) : data.results;
      
      setSearchResults(results);
    } catch (err) {
      setError("Failed to search genes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedChromosome || mode !== "browse") return;
    performGeneSearch(
      selectedChromosome,
      selectedGenome,
      (gene: GeneFromSearch) => gene.chrom === selectedChromosome,
    );
  }, [selectedChromosome, selectedGenome, mode]);

  const handleGenomeChange = (value: string) => {
    setSelectedGenome(value);
    setSearchResults([]);
    setSelectedGene(null);
  };

  const switchMode = (newMode: Mode) => {
    if (newMode === mode) return;

    setSearchResults([]);
    setSelectedGene(null);
    setError(null);

    if (newMode === "browse" && selectedChromosome) {
      performGeneSearch(
        selectedChromosome,
        selectedGenome,
        (gene: GeneFromSearch) => gene.chrom === selectedChromosome,
      );
    }

    setMode(newMode);
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    performGeneSearch(searchQuery, selectedGenome);
  };

  const loadBRCA1Example = () => {
    setMode("search");
    setSearchQuery("BRCA1");
    performGeneSearch("BRCA1", selectedGenome);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-green-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Dna className="h-8 w-8 text-green-900 animate-pulse" />
                <div className="absolute inset-0 h-8 w-8 text-green-400 animate-spin opacity-30">
                  <Dna className="h-8 w-8" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent">
                Gene-Sage-AI
              </span>
              <Badge className="ml-2 bg-gradient-to-r from-green-100 to-green-200 text-red-900 border-blue-200">
                <Brain className="h-3 w-3 mr-1" />
                Evo2 Analysis
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedGene ? (
          <GeneViewer
            gene={selectedGene}
            genomeId={selectedGenome}
            onClose={() => setSelectedGene(null)}
          />
        ) : (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
                Genomic Analysis Platform
              </h1>
              
            </div>

            {/* Genome Assembly Selection */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-slate-900 mb-0">
                    <Globe className="h-5 w-5 mr-2 text-green-900" />
                    Genome Assembly
                  </CardTitle>
                  <Badge variant="outline" className="text-slate-600 border-slate-300">
                    Organism: Human
                  </Badge>
                </div>
              </CardHeader>
              <CardContent >
                <Select
                  value={selectedGenome}
                  onValueChange={handleGenomeChange}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-11 border-slate-300 bg-white hover:border-yellow-400 transition-colors">
                    <SelectValue placeholder="Select genome assembly" />
                  </SelectTrigger>
                  <SelectContent>
                    {genomes.map((genome) => (
                      <SelectItem key={genome.id} value={genome.id}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{genome.id} - {genome.name}</span>
                          {genome.active && <span className="text-xs text-red-600">(active)</span>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedGenome && (
                  <p className="mt-3 text-sm text-slate-500 flex items-center">
                    <Database className="h-4 w-4 mr-1" />
                    {genomes.find((genome) => genome.id === selectedGenome)?.sourceName}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Gene Search and Browse */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-slate-900">
                  <Search className="h-5 w-5 mr-2 text-green-800" />
                  Gene Explorer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={mode}
                  onValueChange={(value) => switchMode(value as Mode)}
                >
                  <TabsList className="grid w-full grid-cols-2 bg-slate-100">
                    <TabsTrigger 
                      className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                      value="search"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search Genes
                    </TabsTrigger>
                    <TabsTrigger
                      className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                      value="browse"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Browse Chromosomes
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="search" className="mt-6">
                    <div className="space-y-4">
                      <form
                        onSubmit={handleSearch}
                        className="flex flex-col gap-3 sm:flex-row"
                      >
                        <div className="relative flex-1">
                          <Input
                            type="text"
                            placeholder="Enter gene symbol or name (e.g., BRCA1, TP53)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-11 border-slate-300 bg-white hover:border-green-400 transition-colors pr-12"
                          />
                          <Button
                            type="submit"
                            className="absolute top-0 right-0 h-full rounded-l-none bg-gradient-to-r from-green-500 to-green-900 hover:from-yellow-500 hover:to-red-800"
                            size="icon"
                            disabled={isLoading || !searchQuery.trim()}
                          >
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                          </Button>
                        </div>
                      </form>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-blue-600 hover:text-blue-700 font-medium"
                        onClick={loadBRCA1Example}
                      >
                        Try BRCA1 example →
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="browse" className="mt-6">
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600">Select a chromosome to explore its genes:</p>
                      <div className="max-h-[200px] overflow-y-auto p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                          {chromosomes.map((chrom) => (
                            <Button
                              key={chrom.name}
                              variant={selectedChromosome === chrom.name ? "default" : "outline"}
                              size="sm"
                              className={`h-10 transition-all duration-200 ${
                                selectedChromosome === chrom.name 
                                  ? "bg-gradient-to-r from-green-500 to-green-800 hover:from-yellow-500 hover:to-red-800 text-white shadow-md" 
                                  : "border-slate-300 hover:bg-slate-100 hover:border-green-400"
                              }`}
                              onClick={() => setSelectedChromosome(chrom.name)}
                            >
                              {chrom.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {isLoading && (
                  <div className="flex justify-center py-8">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-green-600/30 border-t-green-600"></div>
                      <span className="text-slate-600">Loading...</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="flex items-center text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span className="font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {searchResults.length > 0 && !isLoading && (
                  <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-slate-900">
                        {mode === "search" ? "Search Results" : `Genes on ${selectedChromosome}`}
                      </h4>
                      <Badge className="bg-gradient-to-r from-green-50 to-green-100 text-red-900 border-blue-200">
                        {searchResults.length} genes found
                      </Badge>
                    </div>

                    <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 border-slate-200">
                            <TableHead className="font-semibold text-slate-700">
                              <div className="flex items-center">
                                <Dna className="h-4 w-4 mr-2 text-green-900" />
                                Symbol
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-slate-700">
                              <div className="flex items-center">
                                <Database className="h-4 w-4 mr-2 text-yellow-600" />
                                Name
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-slate-700">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-2 text-teal-600" />
                                Location
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {searchResults.map((gene, index) => (
                            <TableRow
                              key={`${gene.symbol}-${index}`}
                              className="cursor-pointer border-b border-slate-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200"
                              onClick={() => setSelectedGene(gene)}
                            >
                              <TableCell className="py-4 font-semibold text-slate-900">
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-green-800 rounded-full mr-3"></div>
                                  {gene.symbol}
                                </div>
                              </TableCell>
                              <TableCell className="py-4 text-slate-700">
                                {gene.name}
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge variant="outline" className="text-slate-600 border-slate-300">
                                  {gene.chrom}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </div>
                )}

                {!isLoading && !error && searchResults.length === 0 && (
                  <div className="flex h-64 flex-col items-center justify-center text-center">
                    <div className="mb-6 p-4 bg-gradient-to-br from-green-500 to-green-800 rounded-full text-white">
                      <Search className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {mode === "search" ? "Ready to Search" : "Select a Chromosome"}
                    </h3>
                    <p className="text-slate-600 max-w-md">
                      {mode === "search"
                        ? "Enter a gene symbol or name to start exploring genomic data and variant analysis"
                        : selectedChromosome
                          ? "No genes found on this chromosome"
                          : "Choose a chromosome above to view all genes in that region"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}


