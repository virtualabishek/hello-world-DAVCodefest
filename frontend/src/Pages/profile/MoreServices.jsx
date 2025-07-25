import { Link } from "react-router-dom"


export default function MoreServices({ user }) {
    const services = [
        { name: "Farm Monitor", img: "https://img.icons8.com/?size=100&id=6421&format=png&color=000000", link: `/devicesetting/${user.devices}` },

        { name: "messenger (Friends)", img: "https://img.icons8.com/?size=100&id=20202&format=png&color=000000", link: `/chatting` },

        { name: "messenger (Expert)", img: "https://img.icons8.com/?size=100&id=114492&format=png&color=000000", link: `/devicesetting/${user.devices}` },

        { name: "messenger (AI)", img: "https://img.icons8.com/?size=100&id=05zIO40VegUf&format=png&color=000000", link: `/devicesetting/${user.devices}` },

        { name: "Plant Identifier", img: "https://img.icons8.com/?size=100&id=aIYc9NMa4dUA&format=png&color=000000", link: `/service/plantidentifier` },
        { name: "Disease identifier", img: "https://img.icons8.com/?size=100&id=14891&format=png&color=000000", link: `/service/diseaseidentifier` },

        { name: "living presense", img: "https://img.icons8.com/?size=100&id=deuhxm4eQhCV&format=png&color=000000", link: `/devicesetting/${user.devices}` },
        { name: "loan Form", img: "https://img.icons8.com/?size=100&id=T91Rrpzq6USn&format=png&color=000000", link: `/devicesetting/${user.devices}` },

        { name: "Subsidy", img: "https://img.icons8.com/?size=100&id=ZdtLbU2ghsGV&format=png&color=000000", link: `/devicesetting/${user.devices}` },
        { name: "Device Setting", img: "https://img.icons8.com/?size=100&id=pb9OgJeV5LAm&format=png&color=000000", link: `/devicesetting/${user.devices}` },
        { name: "Purchase", img: "https://img.icons8.com/?size=100&id=AGpBy6HmyQf2&format=png&color=000000", link: `/devicesetting/${user.devices}` },
        { name: "News", img: "https://img.icons8.com/?size=100&id=111271&format=png&color=000000", link: `/news` },









    ];

    return (
        <div className="w-80  bg-white rounded-xl shadow-lg m-2 p-4">
            <h2 className="text-lg font-semibold mb-4">More Services</h2>
            <div className="grid grid-cols-4 gap-4">
                {services.map((service, idx) => (
                    <Link to={`${service.link}`} key={idx} className="flex flex-col items-center text-center text-xs">
                        <img src={service.img} alt={service.name} className="w-10 h-10" />
                        <span className="mt-1">{service.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
