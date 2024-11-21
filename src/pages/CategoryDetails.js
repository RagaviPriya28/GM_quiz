import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarComp";
import { Pencil, Trash } from "lucide-react";
import EditCategoryModal from "../models/EditCategoryModal";
import { useCategoryContext } from "../context/CategoryContext";

const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const {
    currentCategory,
    loading,
    error,
    fetchCategoryById,
    updateCategory,
    deleteCategory,
  } = useCategoryContext();

  useEffect(() => {
    let mounted = true;

    const loadCategory = async () => {
      if (mounted) {
        await fetchCategoryById(id);
      }
    };

    loadCategory();

    return () => {
      mounted = false;
    };
  }, [id, fetchCategoryById]);

  const handleEditSuccess = useCallback(
    async (updatedData) => {
      const updatedCategory = await updateCategory(id, updatedData);
      if (updatedCategory) {
        setEditModalOpen(false);
      }
    },
    [id, updateCategory]
  );

  const handleDelete = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const success = await deleteCategory(id);
      if (success) {
        navigate("/select-category");
      }
    }
  }, [id, deleteCategory, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-gray-600">
            Loading category details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-gray-600">
            No category found with the specified ID.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {currentCategory.name}
          </h1>
          <p className="text-gray-600 mt-4">{currentCategory.description}</p>
          {currentCategory.imageUrl && (
            <img
              src={currentCategory.imageUrl}
              alt={currentCategory.name}
              className="mt-4 w-full h-auto max-h-96 object-cover rounded-lg"
            />
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Pencil className="h-5 w-5" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash className="h-5 w-5" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        initialData={currentCategory}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default CategoryDetails;
