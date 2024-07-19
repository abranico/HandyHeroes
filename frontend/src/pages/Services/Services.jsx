import { useContext, useState } from "react";
import { Input, Select } from "../../components";
import { MapIcon, SearchIcon } from "../../components/ui/icons";
import { UsersContext } from "../../context/users/users.context";
import { User } from "./components";

const Services = () => {
  const { users } = useContext(UsersContext);

  const [filters, setFilters] = useState({
    service: "",
    professional: "",
    location: "",
  });

  const professionals = users.filter(
    (user) =>
      user.description &&
      user.city &&
      user.country &&
      user.service &&
      user.status
  );

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesService = filters.service
      ? prof.service.toLowerCase() == filters.service.toLowerCase()
      : true;

    const matchesProfessional = filters.professional
      ? (prof.firstName + " " + prof.lastName)
          .toLowerCase()
          .includes(filters.professional.toLowerCase())
      : true;

    const matchesLocation = filters.location
      ? prof.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        prof.country.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    return matchesService && matchesProfessional && matchesLocation;
  });

  const services = [...new Set(professionals.map((user) => user.service))];

  console.log(services);

  return (
    <>
      <header className="px-6 py-11  text-white bg-gradient-to-r from-cyan-600 to-blue-600 ">
        <h1 className="mx-14 text-4xl font-bold">
          Busca el profesional y servicio deseado.
        </h1>
        <div className="mx-14 flex mt-9 py-5 gap-7">
          <Select
            type="combobox"
            options={services}
            placeholder="Buscar oficio"
            icon={<SearchIcon />}
            setFilters={setFilters}
            value={filters.service}
          />

          <Input
            type="search"
            placeholder="Buscar profesional"
            value={filters.professional}
            onChange={(e) =>
              setFilters((prevState) => ({
                ...prevState,
                professional: e.target.value,
              }))
            }
            icon={<SearchIcon />}
          />
          <Input
            type="search"
            placeholder="Ex: New York"
            icon={<MapIcon />}
            value={filters.location}
            onChange={(e) =>
              setFilters((prevState) => ({
                ...prevState,
                location: e.target.value,
              }))
            }
          />
        </div>
      </header>

      <main>
        <ul className="mx-14 px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {filteredProfessionals.length > 0 &&
            filteredProfessionals.map((user) => (
              <User
                key={user.id}
                id={user.id}
                username={user.username}
                img={user.profileImg}
                name={user.firstName + " " + user.lastName}
                description={user.description}
                service={user.service}
                country={user.country}
                city={user.city}
              />
            ))}
        </ul>
      </main>
    </>
  );
};

export default Services;
