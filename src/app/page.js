"use client"; // Add this directive at the top

import Image from "next/image";

import { useState } from "react";

export default function Home() {

    const [period, setPeriod] = useState(null);
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);

    const [periodInput, setPeriodInput] = useState(false);
    const [fileInput, setFileInput] = useState(false);
    const [submitButton, setSubmitButton] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  // State for loading


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Silahkan masukan data yang akan dianalisa (Format CSV)");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        // formData.append("period", 4);
        formData.append("period", period);

        setLoading(true);  // Set loading to true before starting the request

        try {
            const res = await fetch("http://localhost:8080/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setResponse(data);
                setError(null);
                setPeriodInput(true);
                setFileInput(true);
                setSubmitButton(true);
            } else {
                setError(data.error);
                setResponse(null);
            }
        } catch (err) {
            setError(err.message);
            setResponse(null);
        } finally {
            setLoading(false);  // Set loading to false after the request is complete
        }
    };

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Forecasting Penjualan PT. X  dengan Moving Average - Kelompok 2
                </p>
                <div className="fixed bottom-0 left-0 flex  w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/Logo-Trilogi.png"
                            alt="Logo Trilogi"
                            width={100}
                            height={24}
                            priority
                        />
                    </a>
                </div>
            </div>

            <div className="flex mt-20 flex-col items-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <form class="space-y-4" onSubmit={handleSubmit}>

                    <div id="periodData">
                        <label for="period" class="block ml-4 text-white-900 text-md font-sm leading-6">Periode (Tahun)</label>
                        <input type="number" id="period" name="period" placeholder="contoh: 4" readOnly={periodInput} onChange={handlePeriodChange}
                            class="mt-1 ml-4 px-4 py-2 w-full bg-transparent rounded-full focus:outline-blue-500 text-sm leading-6 text-white-900 border border-gray-300" />
                    </div>
                    <div id="fileData">
                        <label for="file" class="block ml-4 text-white-900 text-md font-sm leading-6">Silahkan masukan data yang akan dianalisa (Format CSV)</label>
                        <input id="file_input" type="file" onChange={handleFileChange} accept=".csv" disabled={periodInput}
                            class="mt-1 ml-4 p-1 w-full text-white-500 text-sm rounded-full leading-6 file:bg-blue-200 file:text-blue-700 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 file:rounded-full hover:file:bg-blue-100 border border-gray-300" />
                    </div>
                    <button id="submit" disabled={submitButton} class="mt-1 ml-4 px-4 py-2 w-full bg-white-100 rounded-full focus:outline-blue-500 disabled:bg-gray-300 text-sm leading-6 bg-blue-600 text-white cursor-pointer disabled:cursor-not-allowed">
                        Upload now
                    </button>
                </form>
            </div>

            {loading && (
                <div className="mt-10">
                    <p className="text-white-900">Loading...</p>
                </div>
            )}

            {response && (
                <div id="table-result">
                    <div className="relative mt-10 flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

                        <div class="flex flex-col items-stretch w-screen py-10 px-96">
                            <h1 class="text-lg text-white-400 font-medium">Tabel Perbandingan Metode SMA dan WMA</h1>
                            <div class="flex flex-col mt-6">
                                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div class="shadow overflow-hidden sm:rounded-lg">
                                            <div className="table-container">
                                                <table class="min-w-full text-sm text-gray-400">
                                                    <thead class="bg-gray-800 text-xs uppercase font-medium">
                                                        <tr>
                                                            {/* <th></th> */}
                                                            <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                                Metode
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                                Hasil Prediksi
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                                MAE
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                                MSE
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="bg-gray-800">
                                                        <tr class="bg-black bg-opacity-20">
                                                            <td class="pl-4">
                                                                {response.perbandingan.metodeSma}
                                                            </td>
                                                            <td class="flex px-6 py-4 whitespace-nowrap">
                                                                {response.perbandingan.hasilPrediksiSma}
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                {response.perbandingan.maeSma}
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                {response.perbandingan.mseSma}
                                                            </td>

                                                        </tr>
                                                        <tr class="bg-black bg-opacity-20">
                                                            <td class="pl-4">
                                                                {response.perbandingan.metodeWma}
                                                            </td>
                                                            <td class="flex px-6 py-4 whitespace-nowrap">
                                                                {response.perbandingan.hasilPrediksiWma}
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                {response.perbandingan.maeWma}
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                {response.perbandingan.mseWma}
                                                            </td>

                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                        <div class="flex flex-col items-stretch w-full pl-10 pr-1.5 y-10">
                            <h1 class="text-lg text-white-400 font-medium">Tabel Perhitungan Metode SMA</h1>
                            <div class="flex flex-col mt-6">
                                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div class="shadow overflow-hidden sm:rounded-lg">
                                            <div className="table-container">
                                                <table class="min-w-full text-sm text-gray-400">                                                <thead class="bg-gray-800 text-xs uppercase font-medium">
                                                    <tr>
                                                        <th></th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Tahun
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Sales
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Forecasting
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Error
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Absolut Error
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Error²
                                                        </th>
                                                    </tr>
                                                </thead>
                                                    <tbody class="bg-gray-800">
                                                        {response.perhitunganSma.detail.map((row, index) => (

                                                            <tr key={index} className={index % 2 === 0 ? 'bg-black bg-opacity-20' : ''}>
                                                                <td class="pl-4">
                                                                    {index + 1}
                                                                </td>
                                                                <td class="pl-6">
                                                                    {row.tahun}
                                                                </td>
                                                                <td class="flex px-6 py-4 whitespace-nowrap">
                                                                    {row.sales}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    {row.forecasting}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    {row.error}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    {row.absoluteError}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    {row.error2}
                                                                </td>

                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td class="px-6 py-4 whitespace-nowrap tex">
                                                                <strong>{response.perhitunganSma.totalForecast}</strong>
                                                            </td>
                                                            <td></td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <strong>{response.perhitunganSma.totalAbsolutError}</strong>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <strong>{response.perhitunganSma.totalError2}</strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="flex flex-col items-stretch w-full pl-10 pr-8 y-10">
                            <h1 class="text-lg text-white-400 font-medium">Tabel Perhitungan Metode WMA</h1>
                            <div class="flex flex-col mt-6">
                                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div class="shadow overflow-hidden sm:rounded-lg">
                                            <div className="table-container">
                                                <table class="min-w-full text-sm text-gray-400">                                                <thead class="bg-gray-800 text-xs uppercase font-medium">
                                                    <tr>
                                                        <th></th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Tahun
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Sales
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Forecasting
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Error
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Absolut Error
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                            Error²
                                                        </th>
                                                    </tr>
                                                </thead>
                                                    <tbody class="bg-gray-800">
                                                        {response.perhitunganWma.detail.map((row, index) => (

                                                            <tr key={index} className={index % 2 === 0 ? 'bg-black bg-opacity-20' : ''}>
                                                                <td class="pl-4">
                                                                    {index + 1}
                                                                </td>
                                                                <td class="pl-6">
                                                                    {row.tahun}
                                                                </td>
                                                                <td class="flex px-6 py-4 whitespace-nowrap">
                                                                    {row.sales}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    {row.forecasting}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    {row.error}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    {row.absoluteError}
                                                                </td>
                                                                <td class="px-6 py-4 whitespace-nowrap">
                                                                    {row.error2}
                                                                </td>

                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td class="px-6 py-4 whitespace-nowrap tex">
                                                                <strong>{response.perhitunganWma.totalForecast}</strong>
                                                            </td>
                                                            <td></td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <strong>{response.perhitunganWma.totalAbsolutError}</strong>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <strong>{response.perhitunganWma.totalError2}</strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            )}



        </main>
    );
}
