import Image from 'next/image';
import { PokemonDetailedInfo } from "../interface";

const PokemonCard: React.FC<{ pokemon: PokemonDetailedInfo }> = ({ pokemon }) => {
  return (
    <div className="border rounded-lg shadow-lg p-6 w-full bg-white max-w-4xl mx-auto">
      <div className="flex flex-col items-center md:flex-row md:items-start">
        {pokemon.sprites.front_default &&
            <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={192} // Equivalent to w-48 (48 * 4px)
            height={192} // Equivalent to h-48 (48 * 4px)
            className="mx-auto md:mx-0"
            />
        }
        <div className="md:ml-6 w-full">
          <h2 className="text-2xl font-bold text-center md:text-left capitalize">
            {pokemon.name} #{pokemon.id}
          </h2>
          <p className="text-sm text-gray-600 text-center md:text-left">Weight: {pokemon.weight}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Stats:</h3>
            <ul className="text-sm">
              {pokemon.stats.map((stat, index) => (
                <li key={index} className="flex justify-between">
                  <span className="capitalize">{stat.stat.name}:</span>
                  <span>{stat.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Abilities:</h3>
            <ul className="text-sm">
              {pokemon.abilities.map((ability, index) => (
                <li key={index} className="capitalize">{ability.ability.name}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Types:</h3>
            <ul className="text-sm flex gap-2">
              {pokemon.types.map((type, index) => (
                <li
                  key={index}
                  className="px-3 py-1 bg-gray-200 rounded-md capitalize"
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
