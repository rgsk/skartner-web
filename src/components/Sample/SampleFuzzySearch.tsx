import Fuse from 'fuse.js';
import { fuzzySearch } from 'lib/fuzzySearch';
import { useEffect, useMemo, useState } from 'react';

interface ISampleFuzzySearchProps {}
const SampleFuzzySearch: React.FC<ISampleFuzzySearchProps> = ({}) => {
  const [results, setResults] = useState<any>();
  const [input, setInput] = useState('');
  const names = useMemo(
    () => data.map((o) => `${o.first_name} ${o.last_name}`),
    []
  );
  useEffect(() => {
    const fuse = new Fuse(names, { threshold: 0.3 });
    setResults(fuse.search(input).map((v) => v.item));
  }, [input, names]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={input}
        onChange={async (e) => {
          const { value } = e.currentTarget;
          setInput(value);
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
      <pre>My Fuzzy Results: {JSON.stringify(fuzzySearch(input, names))}</pre>
    </div>
  );
};
export default SampleFuzzySearch;

const data = [
  { first_name: 'Biddie', last_name: "O'Lagen" },
  { first_name: 'Daron', last_name: 'Scottini' },
  { first_name: 'Alameda', last_name: 'Androli' },
  { first_name: 'Johannah', last_name: 'Sacks' },
  { first_name: 'Titos', last_name: 'Hammill' },
  { first_name: 'Jori', last_name: 'McParland' },
  { first_name: 'Terra', last_name: 'Eates' },
  { first_name: 'Tamma', last_name: 'Bakhrushin' },
  { first_name: 'Karel', last_name: 'Spowage' },
  { first_name: 'Ollie', last_name: 'Colomb' },
  { first_name: 'Connie', last_name: 'Bassford' },
  { first_name: 'Elana', last_name: 'Indge' },
  { first_name: 'Lancelot', last_name: 'Copcote' },
  { first_name: 'Darbee', last_name: 'Dugan' },
  { first_name: 'Otis', last_name: 'Fortescue' },
  { first_name: 'Faina', last_name: 'Steiner' },
  { first_name: 'Boniface', last_name: 'Coupar' },
  { first_name: 'Bernhard', last_name: 'Furnell' },
  { first_name: 'Erastus', last_name: 'Sultan' },
  { first_name: 'Elfrida', last_name: 'Redshaw' },
  { first_name: 'Ericka', last_name: 'Darington' },
  { first_name: 'Tibold', last_name: 'Poad' },
  { first_name: 'Walliw', last_name: 'Chiene' },
  { first_name: 'Oby', last_name: 'Clements' },
  { first_name: 'Erinna', last_name: 'Van Leeuwen' },
  { first_name: 'Magdalene', last_name: 'Jerrold' },
  { first_name: 'Roma', last_name: 'MacSherry' },
  { first_name: 'Ad', last_name: 'Storrock' },
  { first_name: 'Asia', last_name: 'Cecere' },
  { first_name: 'Kara-lynn', last_name: 'Wick' },
  { first_name: 'Caty', last_name: 'Muckeen' },
  { first_name: 'Minne', last_name: 'Navein' },
  { first_name: 'Eryn', last_name: 'Blackborn' },
  { first_name: 'Devon', last_name: 'MacVean' },
  { first_name: 'Debbi', last_name: 'Ziemen' },
  { first_name: 'Chet', last_name: 'Palk' },
  { first_name: 'Britte', last_name: 'Gilpillan' },
  { first_name: 'Giacopo', last_name: 'Meys' },
  { first_name: 'Leigh', last_name: 'Spellacey' },
  { first_name: 'Reilly', last_name: 'Brozek' },
  { first_name: 'Gianni', last_name: 'Hillaby' },
  { first_name: 'Eartha', last_name: 'Jerrim' },
  { first_name: 'Dill', last_name: 'Presho' },
  { first_name: 'Sven', last_name: 'Attle' },
  { first_name: 'Gabbey', last_name: 'Shory' },
  { first_name: 'Zacherie', last_name: 'Grealey' },
  { first_name: 'Emalee', last_name: "O'Collopy" },
  { first_name: 'Jamil', last_name: 'Lovegrove' },
  { first_name: 'Hillyer', last_name: 'Bussell' },
  { first_name: 'Aldon', last_name: 'Foss' },
  { first_name: 'Timmy', last_name: 'Dami' },
  { first_name: 'Emili', last_name: 'Glazier' },
  { first_name: 'Lyndel', last_name: 'Renner' },
  { first_name: 'Carena', last_name: 'Galpen' },
  { first_name: 'Ewell', last_name: 'Saker' },
  { first_name: 'Elaina', last_name: 'Roches' },
  { first_name: 'Dorey', last_name: 'Vallow' },
  { first_name: 'Marc', last_name: 'Dane' },
  { first_name: 'Buiron', last_name: 'Renvoise' },
  { first_name: 'Greg', last_name: 'Korneluk' },
  { first_name: 'Boycie', last_name: 'Foxcroft' },
  { first_name: 'Kippy', last_name: 'McCready' },
  { first_name: 'Emlyn', last_name: 'Lermit' },
  { first_name: 'Ralf', last_name: 'Bote' },
  { first_name: 'Shell', last_name: 'Suggitt' },
  { first_name: 'Arlin', last_name: 'Spurdens' },
  { first_name: 'Stavros', last_name: 'Feldklein' },
  { first_name: 'Robin', last_name: 'Churms' },
  { first_name: 'Eduardo', last_name: 'Blumsom' },
  { first_name: 'Bard', last_name: 'Varnals' },
  { first_name: 'Tommy', last_name: 'Dufoure' },
  { first_name: 'Jasmine', last_name: 'Traice' },
  { first_name: 'Margette', last_name: 'Shewsmith' },
  { first_name: 'Hailey', last_name: 'Dayly' },
  { first_name: 'Nada', last_name: 'Gamlen' },
  { first_name: 'Nettie', last_name: 'Doyland' },
  { first_name: 'Lionel', last_name: 'Chisholme' },
  { first_name: 'Rafael', last_name: 'Bartoszinski' },
  { first_name: 'Kathlin', last_name: 'Josefovic' },
  { first_name: 'Witty', last_name: "De'Vere - Hunt" },
  { first_name: 'Yank', last_name: 'Bernardon' },
  { first_name: 'Gradeigh', last_name: 'Hilling' },
  { first_name: 'Rozamond', last_name: 'McCowen' },
  { first_name: 'Alissa', last_name: 'Bumpass' },
  { first_name: 'Tomaso', last_name: 'Knowler' },
  { first_name: 'Hyman', last_name: 'Faireclough' },
  { first_name: 'Aeriel', last_name: 'Dupey' },
  { first_name: 'Aimee', last_name: 'Coper' },
  { first_name: 'Ada', last_name: 'Snare' },
  { first_name: 'Farah', last_name: 'Bjerkan' },
  { first_name: 'Bourke', last_name: 'Jobes' },
  { first_name: 'Goraud', last_name: 'Mounce' },
  { first_name: 'Pip', last_name: 'Shobbrook' },
  { first_name: 'Cynde', last_name: 'Pluck' },
  { first_name: 'Werner', last_name: 'Gaule' },
  { first_name: 'Daisey', last_name: 'todor' },
  { first_name: 'Serene', last_name: 'Filintsev' },
  { first_name: 'Correna', last_name: 'Moseley' },
  { first_name: 'Thayne', last_name: 'Imrie' },
  { first_name: 'Charis', last_name: 'Carbry' },
];
