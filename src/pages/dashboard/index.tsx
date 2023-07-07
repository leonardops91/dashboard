import { Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Can from "../../components/can";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { api } from "../../services/api";


export default function Dashboard() {
  const [usersPerMonth, setUsersPerMonth] = useState<{ month: string; count: unknown; }[]>([])
  

    useEffect(() => {
      api.get("users/all").then((response) => {
        const data = response.data.users;
        if (data) {
          const counts = {};
          data.forEach((user: { created_at: string | number | Date }) => {
            const date = new Date(user.created_at);
            const monthOfCreation = date.getMonth();
            const yearOfCreation = date.getFullYear();

            let monthAndYear;
            if ((monthOfCreation + 1).toString().length < 2) {
              monthAndYear = `0${monthOfCreation + 1}-${yearOfCreation}`;
            } else {
              monthAndYear = `${monthOfCreation + 1}-${yearOfCreation}`;
            }

            if (counts[monthAndYear]) {
              counts[monthAndYear] += 1;
            } else {
              counts[monthAndYear] = 1;
            }
          });
          const array = Object.entries(counts).map(([monthAndYear, qtde]) => {
            return { monthAndYear, qtde };
          });

          array.sort((a, b) => {
            const [aMonth, aYear] = a.monthAndYear.split("-");
            const [bMonth, bYear] = b.monthAndYear.split("-");
            const aDate = Number(new Date(Number(aYear), Number(aMonth)));
            const bDate = Number(new Date(Number(bYear), Number(bMonth)));

            return aDate - bDate;
          });

          setUsersPerMonth(array);
        }
      })
    }, []);

    return (
      <Can permissions={['metrics.list']}>
        {usersPerMonth.length > 0 ? 
        (<Flex direction='column' align='center' w='100%'  overflow='auto'>
          <Heading fontSize={28}>Número de usuários cadastrados por mês</Heading>
          <LineChart width={usersPerMonth.length*90} height={400} data={usersPerMonth}>
            <Line type='monotone' dataKey='qtde' stroke='#8884d8' label='qtde'/>
            <XAxis dataKey='monthAndYear' />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Flex> ) : (<Center h='100vh' w='100%'> <Spinner /></Center>) 
        }
      </Can>
    );
}


