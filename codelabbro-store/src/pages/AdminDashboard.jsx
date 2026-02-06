import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, PackagePlus, ListTree, LogOut, 
  Zap, Settings, ShoppingCart, User, MapPin, Clock
} from 'lucide-react';

const AdminDashboard = () => {
  // --- STATES ---
  const [activeTab, setActiveTab] = useState('addProduct'); // Tabs: addProduct, viewOrders
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState({
    name: '', price: '', brand: 'Apple', model: '', 
    category: 'Best Sellers', type: '', image: '', description: '',
    targetSection: 'Slider', productType: 'Mobile', specifications: '' 
  });

  // --- FETCH ORDERS ---
  useEffect(() => {
    if (activeTab === 'viewOrders') {
      const fetchOrders = async () => {
        try {
          const res = await axios.get('https://e-store-dn87.onrender.com/api/admin/orders');
          setOrders(res.data.orders);
        } catch (err) { console.error("Orders fetch error", err); }
      };
      fetchOrders();
    }
  }, [activeTab]);

  // --- HANDLERS ---
  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalProduct = { ...product, specifications: JSON.parse(product.specifications || '{}') };
      await axios.post('https://e-store-dn87.onrender.com/api/products', finalProduct);
      alert("🚀 Great job Codelab! Product live hai.");
      setProduct({ name: '', price: '', brand: 'Apple', model: '', category: 'Best Sellers', type: '', image: '', description: '', targetSection: 'Slider', productType: 'Mobile', specifications: '' });
    } catch (err) { alert("Error: JSON format sahi se likho!"); }
  };

  return (
    <div className="flex min-h-screen bg-[#F2F2F7] text-[#1d1d1f] font-sans">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-80 bg-[#000] text-white flex-col sticky top-0 h-screen shadow-2xl">
        <div className="p-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Zap size={18} fill="white" /></div>
            <h1 className="text-2xl font-bold tracking-tight">CODELAB</h1>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-11">Management</p>
        </div>

        <nav className="flex-1 px-6 space-y-3 mt-4">
          <button onClick={() => setActiveTab('addProduct')} className="w-full">
            <NavItem icon={<PackagePlus size={22}/>} label="Add New Product" active={activeTab === 'addProduct'} />
          </button>
          
          {/* NAYA TAB: CUSTOMER ORDERS */}
          <button onClick={() => setActiveTab('viewOrders')} className="w-full">
            <NavItem icon={<ShoppingCart size={22}/>} label="Customer Orders" active={activeTab === 'viewOrders'} />
          </button>

          <NavItem icon={<ListTree size={22}/>} label="Store Inventory" />
          <NavItem icon={<LayoutDashboard size={22}/>} label="Sales Analytics" />
        </nav>

        <div className="p-8 border-t border-[#1c1c1e]">
          <button className="flex items-center gap-3 text-gray-500 hover:text-red-400 transition-all w-full pl-2">
            <LogOut size={20}/> <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 md:p-16">
          
          {/* CONDITIONALLY RENDER: ADD PRODUCT FORM */}
          {activeTab === 'addProduct' && (
            <>
              <header className="mb-16">
                <h2 className="text-5xl font-black tracking-tighter text-black uppercase italic">Product Studio</h2>
                <p className="text-gray-500 text-lg font-medium">Flipkart-style dynamic product loader.</p>
              </header>

              <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
                <div className="bg-white rounded-[48px] p-10 shadow-2xl border border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-8">
                      <h3 className="text-xl font-bold border-b pb-4 text-blue-600 flex items-center gap-2"><PackagePlus size={20}/> 1. Basic Details</h3>
                      <CustomInput label="Display Name" name="name" value={product.name} onChange={handleChange} />
                      <CustomInput label="Price (₹)" name="price" value={product.price} type="number" onChange={handleChange} />
                      <CustomInput label="Image URL" name="image" value={product.image} onChange={handleChange} />
                      <CustomInput label="Description" name="description" value={product.description} onChange={handleChange} />
                    </div>
                    <div className="space-y-8">
                      <h3 className="text-xl font-bold border-b pb-4 text-blue-600 flex items-center gap-2"><Settings size={20}/> 2. Store Routing</h3>
                      <CustomSelect label="Design Type" name="productType" value={product.productType} options={["Mobile", "Accessory"]} onChange={handleChange} />
                      <CustomSelect label="Section" name="targetSection" value={product.targetSection} options={["Slider", "Featured", "Grid", "BrandPage"]} onChange={handleChange} />
                      <CustomSelect label="Brand" name="brand" value={product.brand} options={["Apple", "SAMSUNG", "vivo", "oppo"]} onChange={handleChange} />
                      <CustomInput label="Model" name="model" value={product.model} onChange={handleChange} />
                      <CustomInput label="Filter Tag" name="type" value={product.type} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="mt-16 space-y-6">
                    <h3 className="text-xl font-bold border-b pb-4 text-indigo-600">3. Technical Specifications (JSON)</h3>
                    <textarea name="specifications" value={product.specifications} onChange={handleChange} className="w-full bg-[#F2F2F7] p-8 rounded-[32px] h-60 font-mono text-sm outline-none" placeholder='{"ram": "8GB"}' />
                  </div>
                  <button type="submit" className="mt-16 w-full bg-black text-white py-8 rounded-[32px] font-black text-2xl hover:bg-blue-600 transition-all">PUSH TO DATABASE</button>
                </div>
              </form>
            </>
          )}

          {/* CONDITIONALLY RENDER: ORDERS LIST */}
          {activeTab === 'viewOrders' && (
            <>
              <header className="mb-16 flex justify-between items-end">
                <div>
                  <h2 className="text-5xl font-black tracking-tighter text-black uppercase italic">Live Orders</h2>
                  <p className="text-gray-500 text-lg font-medium">Manage your customer requests.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl shadow-sm font-black text-blue-600">Total: {orders.length}</div>
              </header>

              <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-[32px] p-8 shadow-xl border border-white flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest"><User size={14}/> Customer</div>
                      <p className="text-xl font-bold">{order.customer.firstName} {order.customer.lastName}</p>
                      <p className="text-gray-500 font-medium">{order.customer.phone} | {order.customer.email}</p>
                      <div className="flex items-start gap-2 text-gray-400 text-sm italic"><MapPin size={14} className="mt-1 shrink-0"/> {order.customer.address}, {order.customer.city}</div>
                    </div>

                    <div className="bg-[#F2F2F7] p-6 rounded-[24px] min-w-[250px]">
                      <div className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase tracking-widest mb-4"><Clock size={14}/> Items Ordered</div>
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center mb-2 last:mb-0">
                          <span className="font-bold text-sm truncate max-w-[150px]">{item.name}</span>
                          <span className="text-xs bg-black text-white px-2 py-1 rounded-md font-bold">x{item.quantity}</span>
                        </div>
                      ))}
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                        <span className="font-black text-blue-600 text-xl">₹{order.totalAmount.toLocaleString()}</span>
                        <span className="text-[10px] font-black bg-green-100 text-green-600 px-2 py-1 rounded italic">PAID</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

// Reusable Components
const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-4 p-5 rounded-[20px] cursor-pointer transition-all ${active ? 'bg-[#1c1c1e] text-blue-500 shadow-inner' : 'text-gray-500 hover:bg-[#1c1c1e] hover:text-white'}`}>
    <span>{icon}</span> <span className="font-bold tracking-tight">{label}</span>
  </div>
);

const CustomInput = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input {...props} className="bg-[#F2F2F7] p-5 rounded-[20px] border-2 border-transparent focus:border-black focus:bg-white transition-all outline-none font-semibold" required />
  </div>
);

const CustomSelect = ({ label, options, name, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <select name={name} value={value} onChange={onChange} className="bg-[#F2F2F7] p-5 rounded-[20px] font-bold cursor-pointer outline-none border-2 border-transparent focus:border-black">
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default AdminDashboard;