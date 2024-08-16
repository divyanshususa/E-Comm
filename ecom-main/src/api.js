// api.js
const API_BASE_URL = "http://localhost:5000";

export const addProduct = async (formData, id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/products/addproduct?adminkey=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Error adding product");
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const addImage = async (image, id) => {
  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await fetch(`${API_BASE_URL}/api/upload/addfiles`, {
      method: "POST",
      body: formData,
      params: {
        adminkey: id,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding image:", error.message);
    throw error;
  }
};

export const addMultipleImage = async (multipleImages, id) => {
  const formData = new FormData();

  for (let i = 0; i < multipleImages.length; i++) {
    formData.append("files", multipleImages[i]);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/upload/addmultifiles`, {
      method: "POST",
      body: formData,
      params: {
        adminkey: id,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding multiple images:", error.message);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/category/getcategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching categories");
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getCategorty = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/category/getcategorty?categoryid=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching categories");
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getSubcategories = async (categoryId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/category/getsubcategory?cid=${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching subcategories");
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
