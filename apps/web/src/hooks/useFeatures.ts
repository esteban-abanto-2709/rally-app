"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { Feature, CreateFeatureDto } from "@/types/feature"; // Need to check if types exist

interface UseFeaturesOptions {
  projectSlug?: string;
  autoLoad?: boolean;
}

export function useFeatures(options: UseFeaturesOptions = {}) {
  const { projectSlug, autoLoad = true } = options;
  const { token } = useAuth();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFeatures = useCallback(async () => {
    if (!token || !projectSlug) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const endpoint = routes.api.features.list(projectSlug);
      const data = await api.get<Feature[]>(endpoint, token);
      setFeatures(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load features");
      console.error("Failed to load features:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, projectSlug]);

  useEffect(() => {
    if (autoLoad) {
      loadFeatures();
    }
  }, [loadFeatures, autoLoad]);

  const createFeature = async (data: CreateFeatureDto): Promise<Feature> => {
    if (!token || !projectSlug) throw new Error("Missing params");

    const newFeature = await api.post<Feature>(
      routes.api.features.list(projectSlug),
      data,
      token,
    );
    setFeatures((prev) => [newFeature, ...prev]);
    return newFeature;
  };

  const getFeature = useCallback(
    async (slug: string) => {
      if (!token || !projectSlug) return null;
      try {
        return await api.get<Feature>(
          routes.api.features.detail(projectSlug, slug),
          token,
        );
      } catch (error) {
        console.error("Failed to fetch feature:", error);
        return null;
      }
    },
    [token, projectSlug],
  );

  const updateFeature = async (
    slug: string,
    data: Partial<CreateFeatureDto>,
  ) => {
    if (!token || !projectSlug) throw new Error("Missing params");
    const updated = await api.patch<Feature>(
      routes.api.features.detail(projectSlug, slug),
      data,
      token,
    );
    setFeatures((prev) =>
      prev.map((f) => (f.slug === slug ? { ...f, ...updated } : f)),
    );
    return updated;
  };

  const deleteFeature = async (slug: string) => {
    if (!token || !projectSlug) throw new Error("Missing params");
    await api.delete(routes.api.features.detail(projectSlug, slug), token);
    setFeatures((prev) => prev.filter((f) => f.slug !== slug));
  };

  return {
    features,
    isLoading,
    error,
    loadFeatures,
    getFeature,
    createFeature,
    updateFeature,
    deleteFeature,
  };
}
