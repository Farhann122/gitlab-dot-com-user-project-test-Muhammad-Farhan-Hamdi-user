import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PostList = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const sort = searchParams.get("sort") || "-published_at";

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sort}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      setData(json.data || []);
      setMeta(json.meta ?? { current_page: 1, total_pages: 1, total: 0 });
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, size, sort]);

  const handleSortChange = (e) => {
    setSearchParams({ page: 1, size, sort: e.target.value });
  };

  const handleSizeChange = (e) => {
    setSearchParams({ page: 1, size: e.target.value, sort });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, size, sort });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Control */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <p className="text-sm text-gray-600">
          Showing: {(meta.current_page - 1) * size + 1} -{" "}
          {Math.min(meta.current_page * size, meta.total)} of {meta.total}
        </p>
        <div className="flex items-center gap-4">
          <label className="text-sm">Show per page:</label>
          <select
            value={size}
            onChange={handleSizeChange}
            className="border rounded px-2 py-1 text-sm"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <label className="text-sm ml-4">Sort by:</label>
          <select
            value={sort}
            onChange={handleSortChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={item.small_image?.[0]?.url}
                alt={item.title || "Post image"}
                className="w-full h-48 object-cover"
                loading="lazy"
              />

              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">
                  {new Date(item.published_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="text-lg font-semibold line-clamp-3 ">
                  {item.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta?.total_pages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map(
            (num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  num === meta.current_page
                    ? "bg-orange-500 text-white"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                {num}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
