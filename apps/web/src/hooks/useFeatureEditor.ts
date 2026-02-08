import { useState, useEffect, useCallback } from "react";
import { Feature, UpdateFeatureDto } from "@/types/feature";

interface UseFeatureEditorOptions {
  feature: Feature | null;
  onUpdate: (slug: string, data: UpdateFeatureDto) => Promise<Feature | void>;
}

export function useFeatureEditor({
  feature,
  onUpdate,
}: UseFeatureEditorOptions) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (feature) {
      setEditedData({
        name: feature.name,
        description: feature.description || "",
      });
    }
  }, [feature]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleChange = useCallback(
    (field: keyof typeof editedData, value: string) => {
      setEditedData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const hasChanges = useCallback(() => {
    if (!feature) return false;
    return (
      editedData.name !== feature.name ||
      editedData.description !== (feature.description || "")
    );
  }, [feature, editedData]);

  const handleSave = useCallback(async () => {
    if (!feature) return;

    if (!hasChanges()) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    const updateData: UpdateFeatureDto = {
      name: editedData.name !== feature.name ? editedData.name : undefined,
      description:
        editedData.description !== (feature.description || "")
          ? editedData.description
          : undefined,
    };

    try {
      await onUpdate(feature.slug, updateData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update feature:", error);
    } finally {
      setIsSaving(false);
    }
  }, [feature, editedData, hasChanges, onUpdate]);

  const handleCancel = useCallback(() => {
    if (feature) {
      setEditedData({
        name: feature.name,
        description: feature.description || "",
      });
    }
    setIsEditing(false);
  }, [feature]);

  return {
    isEditing,
    isSaving,
    editedData,
    hasChanges: hasChanges(),
    startEditing,
    handleChange,
    handleSave,
    handleCancel,
    setEditedData,
    setIsEditing,
  };
}
