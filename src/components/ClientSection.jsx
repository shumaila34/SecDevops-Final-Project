// import Marquee from "react-fast-marquee";

// const clients = [
//   {
//     image:
//       "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb", // Fashion
//     name: "Fashion",
//     position: "Trendy Styles",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9", // Beauty
//     name: "Beauty",
//     position: "Makeup & Skincare",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", // Electronics
//     name: "Electronics",
//     position: "Smart Gadgets",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", // Laptop
//     name: "Laptops",
//     position: "Work & Gaming",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1606813902914-56c5de9f67f4", // Home Appliances
//     name: "Home",
//     position: "Furniture & Decor",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1606813903021-8b2d23d65c6f", // Gaming
//     name: "Gaming",
//     position: "Consoles & Accessories",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", // Clothing
//     name: "Clothing",
//     position: "Men & Women",
//   },
// ];



// const colors = ["#FDE68A", "#A5F3FC", "#C4B5FD", "#FCA5A5", "#35F571"];

// const ClientSection = () => {
//   return (
//     <div className="py-5 mt-10 overflow-hidden">
//       <Marquee speed={100} gradient={false}>
//         {clients.map((client, index) => {
//           const bgColor = colors[index % colors.length];

//           return (
//             <div
//               key={index}
//               className="group relative flex flex-col justify-end h-[270px] w-[250px] m-2 rounded-lg overflow-hidden"
//             >
//               {/* Image Wrapper */}
//               <div
//                 className="flex flex-1 items-center justify-center grayscale group-hover:grayscale-0 transition duration-300"
//                 style={{ backgroundColor: bgColor }}
//               >
//                 <img
//                   src={client.image}
//                   alt={client.name}
//                   className="max-h-full max-w-full object-contain z-10"
//                 />
//               </div>

//               {/* Overlay */}
//               {/* <div className="absolute bottom-2 left-2 right-2 bg-blue-600 text-white px-5 py-3 rounded-md shadow-md border-t border-gray-300">
//                 <h3 className="m-0 text-base font-bold">{client.name}</h3>
//                 <p className="m-0 text-base font-normal opacity-90">
//                   {client.position}
//                 </p> 
//               </div>*/}
//             </div>
//           );
//         })}
//       </Marquee>
//     </div>
//   );
// };

// export default ClientSection;




import Marquee from "react-fast-marquee";

const clients = [
  {
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb", // Fashion
    name: "Fashion",
    position: "Trendy Styles",
  },
  {
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9", // Beauty
    name: "Beauty",
    position: "Makeup & Skincare",
  },
  {
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", // Electronics
    name: "Electronics",
    position: "Smart Gadgets",
  },
  {
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", // Laptop
    name: "Laptops",
    position: "Work & Gaming",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY9pvV_P9h91LRghihGic-Bfd2J6gmTUeG8Q&s", // Home Appliances
    name: "Home",
    position: "Furniture & Decor",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIfa3OGY7q3idVOMSfRnFFIrRkq8BdPIy6Nw&s", // Gaming
    name: "Gaming",
    position: "Consoles & Accessories",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiWm6_bKIvmCXkdXnJxU5l20cnYk-MO07DQg&s", // Clothing
    name: "Clothing",
    position: "Men & Women",
  },
];

const ClientSection = () => {
  return (
    <div className="py-5 mt-10 overflow-hidden">
      <Marquee speed={100} gradient={false}>
        {clients.map((client, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-end h-[270px] w-[250px] m-2 rounded-lg overflow-hidden"
          >
            {/* Image Wrapper */}
            <div className="flex flex-1 items-center justify-center w-full h-full">
              <img
                src={client.image}
                alt={client.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientSection;












