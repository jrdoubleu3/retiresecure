{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.getElementById('calculate-button').addEventListener('click', function () \{\
    const hours = parseFloat(document.getElementById('hours').value);\
    const rate = parseFloat(document.getElementById('rate').value);\
    const age = parseFloat(document.getElementById('age').value);\
    const retirementAge = 67;\
\
    if (!hours || !rate || !age || age >= retirementAge) \{\
        document.getElementById('result').textContent = "Please enter valid values.";\
        return;\
    \}\
\
    const years = retirementAge - age;\
    const annualSavings = hours * rate * 52;\
    let totalSavings = 0;\
\
    for (let i = 0; i < years; i++) \{\
        totalSavings += annualSavings;\
        totalSavings *= 1.10; // Growth rate\
    \}\
\
    document.getElementById('result').textContent = `Estimated Savings: $$\{totalSavings.toFixed(2)\}`;\
\});\
}