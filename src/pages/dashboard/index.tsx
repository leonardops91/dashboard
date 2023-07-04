import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { authApi } from "../../services/authApi";

const options = {
    chart: {
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray['500'],
    },
    grid: {
        show:false,
    },
    dataLabels:{
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray['600'],
        },
        axisTicks: {
            color: theme.colors.gray['600'],
        },
        categories: [
            '2023-06-13',
            '2023-06-14',
            '2023-06-15',
            '2023-06-16',
            '2023-06-17',
            '2023-06-18',
        ]
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    }
}
const series = [
    {name: "Series1", data:[31, 120, 10, 28, 51, 109]}
]

export default function Dashboard() {

    return (
      <Flex h={"100vh"} w='100%' my='6' flex={1} maxWidth={1480}>
        <SimpleGrid
          flex='1'
          gap='4'
          minChildWidth='328px'
          alignItems='flex-start'
        >
          <Box p='8' bg='gray.800' borderRadius={8}>
            <Text fontSize='lg' mb='4'>
              Inscritos da semana
            </Text>
            <Chart type='area' height={160} options={options} series={series} />
          </Box>
          <Box p='8' bg='gray.800' borderRadius={8}>
            <Text fontSize='lg' mb='4'>
              Taxa de abertura
            </Text>
            <Chart type='area' height={160} options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Flex>
    );
}