export interface Feature {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface CreateFeatureDto {
  name: string;
  description?: string;
}

export interface UpdateFeatureDto {
  name?: string;
  description?: string;
}
