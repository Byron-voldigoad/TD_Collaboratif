"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Article } from '@/types/database';
import { Plus, Trash2, Package, Tag, Layers, Loader2, FileText } from 'lucide-react';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newArticle = {
      nom,
      prix: parseFloat(prix),
      stock: parseInt(stock, 10),
      description: description || null,
    };

    const { error } = await supabase.from('articles').insert([newArticle]);

    if (error) {
      console.error('Error adding article:', error);
    } else {
      await fetchArticles();
      setNom('');
      setPrix('');
      setStock('');
      setDescription('');
    }
    setSubmitting(false);
  };

  const deleteArticle = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
    } else {
      setArticles(articles.filter((article) => article.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Package className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              Gestion des Articles
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Ajoutez et gérez votre catalogue de produits
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <Plus className="h-5 w-5 text-indigo-500" />
                Nouvel Article
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Désignation
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="nom"
                      required
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Ex: MacBook Pro"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <div className="relative">
                    <div className="absolute top-2.5 left-0 pl-3 pointer-events-none">
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Une brève description du produit..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prix" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prix (€)
                    </label>
                    <input
                      type="number"
                      id="prix"
                      required
                      step="0.01"
                      min="0"
                      value={prix}
                      onChange={(e) => setPrix(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Stock
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Layers className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="stock"
                        required
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Ajouter au catalogue
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
              </div>
            ) : articles.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center h-64">
                <Package className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Aucun article</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Commencez par ajouter votre premier produit.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 p-5 transition-all duration-200 relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                        <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${article.stock > 0
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                        {article.stock > 0 ? "En stock" : "Rupture"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {article.nom}
                    </h3>

                    {article.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                        {article.description}
                      </p>
                    )}

                    <div className="flex items-end justify-between mt-auto">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Prix unitaire</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {article.prix.toFixed(2)} €
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Quantité</p>
                        <p className="font-mono font-medium text-gray-700 dark:text-gray-200">
                          {article.stock}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Supprimer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
