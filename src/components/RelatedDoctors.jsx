import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({docId, speciality}) => {
    const navigate = useNavigate();
    const {doctors} = useContext(AppContext);
    const [relDocs, setRelDocs] = useState([]);

    useEffect(()=>{
        if(doctors.length > 0 && speciality ){
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDocs(doctorsData);
        }
    }, [doctors, docId, speciality]);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h2 className="text-3xl font-medium">Top Doctors to Book</h2>
            <p className="w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>

            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 ">
                {relDocs.slice(0, 5).map((item, idx)=>(
                    <div onClick={()=>{
                        navigate(`/appointment/${item._id}`)
                        scrollTo(0, 0);
                    }} className="border border-blue-200 overflow-hidden rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-300" key={idx}>
                        <img className="bg-blue-50 w-full" src={item.image} alt={item.name} />
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                <p className="w-2 h-2 bg-green-500 rounded-full"></p><p>Available</p>
                            </div>
                            <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                            <p className="text-gray-600 text-sm">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={()=>{
                navigate('/doctors');
                scrollTo(0, 0);
            }} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:translate-y-[-5px] hover:bg-primary transition-all duration-200 hover:text-white">More</button>
        </div>
    )
}

export default RelatedDoctors