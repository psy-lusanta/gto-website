import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { products, brandColors } from "../data/products";

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id));
    const related = products.filter(p => p.brand === product?.brand && p.id !== product?.id).slice(0, 4);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <div className="text-center">
                <p className="text-6xl mb-4"><FaSearch /></p>
                <p className="text-xl font-bold mb-4">Product not found</p>
                <Link to="/" className="text-orange-400 hover:underline">← Back to Shop</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-5">

                {/* Product detail */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

                    {/* Image */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-10 aspect-square">
                        <img src={product.img} alt={product.name}
                            className="max-h-72 w-full object-contain"
                            onError={e => { e.target.src = "https://placehold.co/400x400/1a1a1a/666?text=GTO"; }} />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center">
                        <span className={`inline-block self-start text-xs font-bold px-3 py-1 rounded-full border mb-4 ${brandColors[product.brand] || "bg-orange-500/20 text-orange-300 border-orange-500/30"}`}>
                            {product.brand}
                        </span>

                        <h1 className="font-black text-4xl sm:text-5xl text-white leading-tight mb-3"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            {product.name}
                        </h1>

                        <p className="text-slate-500 text-sm mb-6">{product.category}</p>

                        <div className="text-5xl font-black text-orange-400 mb-8"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            ₱{product.price.toLocaleString()}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => {
                                    navigate("/");
                                    setTimeout(() => {
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }, 100);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-700 to-orange-400 text-white font-semibold text-sm hover:-translate-y-0.5 transition-transform">
                                <Mail size={16} /> Shopee
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/");
                                    setTimeout(() => {
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }, 100);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-700 to-orange-400 text-white font-semibold text-sm hover:-translate-y-0.5 transition-transform">
                                <Mail size={16} /> Lazada
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/");
                                    setTimeout(() => {
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }, 100);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-700 to-orange-400 text-white font-semibold text-sm hover:-translate-y-0.5 transition-transform">
                                <Mail size={16} /> Tiktok
                            </button>
                        </div>

                        <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-slate-400 text-sm leading-relaxed">
                                For bulk orders, pricing inquiries, or reseller information, please contact us directly.
                                GTO Trading serves 6,000+ clients nationwide including malls, retailers, auto supplies, and corporate clients.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related products */}
                {related.length > 0 && (
                    <div>
                        <h2 className="font-black text-3xl text-white mb-6"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            More from <em className="text-orange-500 not-italic">{product.brand}</em>
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {related.map(p => (
                                <Link key={p.id} to={`/product/${p.id}`}
                                    className="group bg-white/[.03] border border-white/10 rounded-2xl overflow-hidden hover:border-orange-600/40 hover:-translate-y-1 transition-all duration-300">
                                    <div className="bg-white/5 aspect-square flex items-center justify-center p-4">
                                        <img src={p.img} alt={p.name}
                                            className="max-h-24 object-contain group-hover:scale-105 transition-transform duration-300"
                                            onError={e => { e.target.src = "https://placehold.co/200x200/1a1a1a/666?text=GTO"; }} />
                                    </div>
                                    <div className="p-3">
                                        <p className="text-white text-xs font-medium leading-snug line-clamp-2 mb-1">{p.name}</p>
                                        <p className="text-orange-400 font-black text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                                            ₱{p.price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}