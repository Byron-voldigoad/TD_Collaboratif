"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Client } from '@/types/database';
import { Users, UserPlus, MapPin, Mail, Loader2, Search } from 'lucide-react';

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form states
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [ville, setVille] = useState('');

    const fetchClients = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching clients:', error);
        } else {
            setClients(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const newClient = {
            nom,
            email,
            ville: ville || null,
        };

        const { error } = await supabase.from('clients').insert([newClient]);

        if (error) {
            console.error('Error adding client:', error);
        } else {
            await fetchClients();
            setNom('');
            setEmail('');
            setVille('');
        }
        setSubmitting(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col gap-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                            Répertoire Clients
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Gérez votre base de données clients
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                        <UserPlus className="h-5 w-5 text-indigo-500" />
                        Nouveau Client
                    </h2>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                id="nom"
                                required
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="Jean Dupont"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="jean@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="ville" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Ville
                            </label>
                            <input
                                type="text"
                                id="ville"
                                value={ville}
                                onChange={(e) => setVille(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="Paris"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed h-[42px]"
                        >
                            {submitting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <UserPlus className="h-5 w-5" />
                                    Ajouter
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
                        </div>
                    ) : clients.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center h-64">
                            <Users className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Aucun client</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Votre base de données clients est vide.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Client
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Localisation
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Date d'inscription
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {clients.map((client) => (
                                        <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                                                            {client.nom.charAt(0).toUpperCase()}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {client.nom}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                    {client.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                    {client.ville || 'Non spécifié'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(client.created_at).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
