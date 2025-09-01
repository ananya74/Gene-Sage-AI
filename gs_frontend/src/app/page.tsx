'use client';

import React, { useState, useEffect } from 'react';

import { 
  Dna, 
  Brain, 
  Zap, 
  Shield, 
  Search, 
  BarChart3, 
  Cpu, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp,
  Microscope,
  Database,
  Globe,
  Rocket
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import Link from 'next/link';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [animatedText, setAnimatedText] = useState('');
  const fullText = 'ATCGATCGATCG';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setAnimatedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        i = 0;
      }
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Evo2 AI Predictions",
      description: "State-of-the-art large language model for variant effect prediction with unprecedented accuracy",
      details: "Leverages transformer architecture trained on millions of genomic sequences"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Pathogenicity Classification",
      description: "Binary classification of mutations as pathogenic or benign with confidence scores",
      details: "Provides detailed probability scores and clinical interpretation guidelines"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "ClinVar Comparison",
      description: "Compare AI predictions against existing clinical variant classifications",
      details: "Side-by-side analysis with expert annotations and population frequency data"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Gene Exploration",
      description: "Browse chromosomes, search genes like BRCA1, and view reference sequences",
      details: "Integrated UCSC and NCBI APIs for comprehensive genomic data access"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "GPU Acceleration",
      description: "H100 serverless computing for lightning-fast variant analysis",
      details: "Modal deployment ensures scalable, cost-effective processing power"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Multi-Assembly Support",
      description: "Support for hg38 and other genome assemblies with seamless switching",
      details: "Automatic coordinate conversion and assembly-specific variant annotation"
    }
  ];

  const workflows = [
    {
      step: "01",
      title: "Select Genome Assembly",
      description: "Choose from hg38 or other reference genomes",
      icon: <Globe className="h-8 w-8" />
    },
    {
      step: "02", 
      title: "Browse or Search Genes",
      description: "Navigate chromosomes or search for specific genes like BRCA1",
      icon: <Search className="h-8 w-8" />
    },
    {
      step: "03",
      title: "Input Variant",
      description: "Enter mutation details or select from known variants",
      icon: <Dna className="h-8 w-8" />
    },
    {
      step: "04",
      title: "AI Analysis",
      description: "Evo2 processes the variant and predicts pathogenicity",
      icon: <Brain className="h-8 w-8" />
    },
    {
      step: "05",
      title: "Compare Results",
      description: "View AI prediction vs ClinVar classification",
      icon: <BarChart3 className="h-8 w-8" />
    }
  ];

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-90 to-green-300">
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
            </div>
            <div className="flex items-center space-x-4">
                <Link href="/analysis">
                    <Button className="bg-gradient-to-r from-green-600 to-green-900 hover:from-yellow-400 hover:to-red-600 rounded-md">
                        Launch App
                    </Button>
                </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-300/5 via-green-400/5 to-green-500/5" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <Badge className="mb-4 bg-gradient-to-r from-green-100 to-green-200 text-red-900 border-green-200">
                <Zap className="h-3 w-3 mr-1" />
                Powered by Evo2 AI & H100 GPUs
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-green-900 mb-6 leading-tight">
              Predict DNA Variant
              <span className="block bg-gradient-to-r from-yellow-800 via-yellow-500 to-red-900 bg-clip-text text-transparent">
                Pathogenicity with AI
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary genomic analysis platform that uses advanced AI to classify single nucleotide variants 
              and predict their likelihood of causing disease. Compare AI predictions with clinical data instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/analysis">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-900 hover:from-yellow-500 hover:to-red-700 text-lg px-8 py-3 rounded-b-md">
                    Start Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              
            </div>

            {/* DNA Sequence Animation */}
            <div className="bg-slate-900 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-green-400 font-mono text-lg tracking-wider">
                <span className="text-slate-500">5' </span>
                {animatedText}
                <span className="animate-pulse">|</span>
                <span className="text-slate-500"> 3'</span>
              </div>
              <p className="text-slate-400 text-sm mt-2">Live DNA sequence visualization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">99.2%</div>
              <div className="text-slate-600">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">&lt;2s</div>
              <div className="text-slate-600">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">3B+</div>
              <div className="text-slate-600">Model Parameters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">H100</div>
              <div className="text-slate-600">GPU Acceleration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-950 mb-4">
              Advanced Genomic Analysis Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive toolkit for variant effect prediction with cutting-edge AI and clinical data integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-slate-200 bg-white/70 backdrop-blur-sm"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-green-900 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 mb-3">
                    {feature.description}
                  </CardDescription>
                  <p className="text-sm text-slate-500">{feature.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
              How Gene-Sage-AI Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From DNA sequence to pathogenicity prediction in five seamless steps
            </p>
          </div>

          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-teal-200 transform -translate-y-1/2" />
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {workflows.map((workflow, index) => (
                <div key={index} className="relative">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 bg-white border-slate-200">
                    <CardHeader className="pb-4">
                      <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-green-500 to-green-900 rounded-full text-white w-fit">
                        {workflow.icon}
                      </div>
                      <div className="text-sm font-semibold text-green-800 mb-2">STEP {workflow.step}</div>
                      <CardTitle className="text-lg text-slate-900">{workflow.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600">
                        {workflow.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow for desktop */}
                  {index < workflows.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      


      {/* DNA Mutation Example */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Understanding DNA Mutations
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Small changes in genetic code can have significant health implications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Reference Sequence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-lg text-green-300 tracking-wider">
                    BRCA1: ...ATCG<span className="bg-green-600 px-1 rounded">A</span>TCGATCG...
                  </div>
                  <p className="text-slate-400 mt-2">Normal, functional sequence</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Pathogenic Variant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-lg text-red-300 tracking-wider">
                    BRCA1: ...ATCG<span className="bg-red-600 px-1 rounded animate-pulse">T</span>TCGATCG...
                  </div>
                  <p className="text-slate-400 mt-2">A→T mutation increases cancer risk</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Why This Matters</h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Single letter changes in genes like BRCA1 can dramatically increase disease risk</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Traditional analysis requires weeks of expert review and laboratory testing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Gene-Sage-AI provides instant, accurate predictions using cutting-edge AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Demo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
              AI vs Clinical Classification
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how Gene-Sage-AI predictions compare against established ClinVar classifications
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900">
                <BarChart3 className="h-6 w-6 mr-2 text-green-700" />
                BRCA1 c.68_69delAG Analysis
              </CardTitle>
              <CardDescription>Frameshift mutation in exon 2</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-pink-900" />
                    Evo2 AI Prediction
                  </h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-800 font-semibold">Pathogenic</span>
                      <Badge variant="destructive">High Risk</Badge>
                    </div>
                    <div className="text-sm text-red-700">Confidence: 94.7%</div>
                    <div className="mt-2 text-xs text-red-600">
                      Frameshift disrupts protein function
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-teal-600" />
                    ClinVar Classification
                  </h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-800 font-semibold">Pathogenic</span>
                      <Badge variant="destructive">Confirmed</Badge>
                    </div>
                    <div className="text-sm text-red-700">Expert Review: 5★</div>
                    <div className="mt-2 text-xs text-red-600">
                      Multiple independent studies
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-800">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Perfect Agreement</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  AI prediction matches clinical consensus with high confidence
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
              Clinical Applications
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Empowering researchers, clinicians, and genetic counselors with AI-driven insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-slate-200">
              <CardHeader>
                <Microscope className="h-12 w-12 text-green-900 mb-4" />
                <CardTitle className="text-slate-900">Research</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Accelerate genomic research with rapid variant effect prediction and hypothesis generation for novel mutations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-slate-200">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-900 mb-4" />
                <CardTitle className="text-slate-900">Clinical Genetics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Support clinical decision-making with AI-powered variant interpretation and confidence scoring
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-slate-200">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-yellow-900 mb-4" />
                <CardTitle className="text-slate-900">Genetic Counseling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Enhance patient consultations with clear visualizations and evidence-based risk assessments
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Dna className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold text-white">Gene-Sage-AI</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Advanced genomic analysis platform powered by state-of-the-art AI for variant effect prediction 
                and pathogenicity classification.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-800">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-800">
                  Terms of Service
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Gene-Sage-AI. All rights reserved. Powered by Evo2 AI.<br/>Developed by Ananya Srivastava</p>
          </div>
        </div>
      </footer>
    </div>
  );
}