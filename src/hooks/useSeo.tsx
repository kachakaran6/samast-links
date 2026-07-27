import { useEffect, useState } from "react";

export default function useSEO() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta tags for keywords
    const keywordsMetaTag: any = document.querySelector(
      'meta[name="keywords"]'
    );
    if (keywordsMetaTag) {
      keywordsMetaTag.content = keywords;
    } else {
      const newKeywordsMetaTag = document.createElement("meta");
      newKeywordsMetaTag.name = "keywords";
      newKeywordsMetaTag.content = keywords;
      document.head.appendChild(newKeywordsMetaTag);
    }

    // Update meta tags for description
    const descriptionMetaTag: any = document.querySelector(
      'meta[name="description"]'
    );
    if (descriptionMetaTag) {
      descriptionMetaTag.content = description;
    } else {
      const newDescriptionMetaTag = document.createElement("meta");
      newDescriptionMetaTag.name = "description";
      newDescriptionMetaTag.content = description;
      document.head.appendChild(newDescriptionMetaTag);
    }

    // Cleanup function to remove added meta tags when component unmounts
    return () => {
      const keywordsMetaTag = document.querySelector('meta[name="keywords"]');
      const descriptionMetaTag = document.querySelector(
        'meta[name="description"]'
      );
      if (keywordsMetaTag) {
        keywordsMetaTag.remove();
      }
      if (descriptionMetaTag) {
        descriptionMetaTag.remove();
      }
    };
  }, [title, keywords, description]);

  // Function to update SEO data
  const updateSEO = (newTitle: any, newKeywords: any, newDescription: any) => {
    setTitle(newTitle);
    setKeywords(newKeywords);
    setDescription(newDescription);
  };

  return updateSEO;
}
