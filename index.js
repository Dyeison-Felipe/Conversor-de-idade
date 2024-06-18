const date = new Date(); // função para pegar o ano, mês e dia atual

const yearCurrent = date.getFullYear(); // pega da const date apenas os 4 digitos do ano atual

const monthCurrent = date.getMonth() + 1; // pega o mês atual(porem vai de 0 a 11), o +1 no final adiciona para ficar no formato ideal de meses 1 a 12

const dayCurrent = date.getDate(); // pega o dia atual

const result = document.getElementById("result");

const calculationBirth = () => {
  const yearRequested = document.getElementById("date-year");
  const monthRequested = document.getElementById("date-month");
  const dayRequested = document.getElementById("date-day");

  const year = Number(yearRequested.value);
  const month = Number(monthRequested.value);
  const day = Number(dayRequested.value);

  const radioYear = document.getElementById("year");
  const radioMonth = document.getElementById("month");
  const radioDay = document.getElementById("day");
  const radioHour = document.getElementById("hour");
  const radioMinutes = document.getElementById("minutes");

  if (!year || !month || !day) {
    result.innerHTML = "Por favor, preencha todos os campos.";
    return;
  }

  if (
    day <= 0 ||
    day > 31 ||
    month <= 0 ||
    month > 12 ||
    year <= 0 ||
    (day >= dayCurrent && month >= monthCurrent && year >= yearCurrent)
  ) {
    result.innerHTML = "Data inválida";
  } else if (radioYear.checked) {
    CalculationYear(year, month, day);
  } else if (radioMonth.checked) {
    CalculationMonth(year, month, day);
  } else if (radioDay.checked) {
    CalculationDay(year, month, day);
  } else if (radioHour.checked) {
    CalculationHours(year, month, day);
  } else if (radioMinutes.checked) {
    CalculationMinutes(year, month, day);
  } else {
    result.innerHTML = "Marque uma das opcões acima";
  }
};

function CalculationYear(year, month, day) {
  let resultYear = yearCurrent - year;
  let resultMonth = monthCurrent - month;
  let resultDay = dayCurrent - day;

  if (resultMonth < 0) {
    resultMonth = 12 + resultMonth;
    resultYear--;
  }

  if (resultDay < 0) {
    // se o resultado dos dias for negativo
    let maxDay;

    if (monthCurrent == 1) {
      // se o mes for igual a janeiro
      maxDay = new Date(yearCurrent - 1, 12, 0).getDate(); //retorna o ultimo dia do mês anterior de dezembro
    } else {
      // para os outros meses
      maxDay = new Date(yearCurrent, monthCurrent - 1, 0).getDate(); //retorna o ultimo dia do mes anterior
    }

    resultDay += maxDay; //soma com o ultimo dia do  mes anterior
    resultMonth--; //subtrai 1 mes
  }

  if (resultMonth < 0) {
    // se o mes for negativo
    resultMonth += 12; // soma o mes negativo + 12 que da o mês positivo
    resultYear--; // subtrai um ano
  }

  let output = "Você tem ";

  if (resultYear == 0) {
  } else if (resultYear == 1) {
    output += `${resultYear} ano, `;
  } else {
    output += `${resultYear} anos, `;
  }

  if (resultMonth == 0) {
  } else if (resultMonth == 1) {
    output += `${resultMonth} mês e `;
  } else if (resultMonth > 1) {
    // se o mes for maior que 1
    output += `${resultMonth} meses e `;
  }

  if (resultDay == 0) {
  } else if (resultDay == 1) {
    output += `${resultDay} dia.`;
  } else if (resultDay > 1) {
    output += `${resultDay} dias.`;
  }

  result.innerHTML = output.trim();
}

function CalculationMonth(year, month, day) {
  let resultYear = yearCurrent - year;
  let resultMonth = resultYear * 12 + (monthCurrent - month);
  let resultDay = dayCurrent - day;

  if (resultDay < 0) {
    // se o resultado dos dias for negativo
    let maxDay;

    if (monthCurrent == 1) {
      // se o mes for igual a janeiro
      maxDay = new Date(yearCurrent - 1, 12, 0).getDate(); //retorna o ultimo dia do mês anterior de dezembro
    } else {
      // para os outros meses
      maxDay = new Date(yearCurrent, monthCurrent - 1, 0).getDate(); //retorna o ultimo dia do mes anterior
    }

    resultDay += maxDay; //soma com o ultimo dia do  mes anterior
    resultMonth--; //subtrai 1 mes
  }

  if (resultMonth < 0) {
    // se o mes for negativo
    resultMonth += 12; // soma o mes negativo + 12 que da o mês positivo
    resultYear--; // subtrai um ano
  }

  let output = "Você tem ";

  if (resultMonth == 0) {
  } else if (resultMonth == 1) {
    output += `${resultMonth} mês e `;
  } else if (resultMonth > 1) {
    output += `${resultMonth} meses e `;
  }

  if (resultDay == 0) {
  } else if (resultDay == 1) {
    output += `${resultDay} dia.`;
  } else if (resultDay > 1) {
    output += `${resultDay} dias.`;
  }

  result.innerHTML = output.trim();
}

function CalculationDay(year, month, day) {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date(yearCurrent, monthCurrent - 1, dayCurrent);

  const time = currentDate - birthDate; // retorna a difereça em milisegundos entre a data enviado e a data atual

  const resultDay = Math.floor(time / (1000 * 60 * 60 * 24)); // multiplica 1000 milisegundos por 60 segundo(que compõem um minuto), o resusultado multiplica por 60 minutos(que compõem um hora), o resultado multiplica por 24horas(que compõem o dia), no final divide pelos milisegundo da diferenca do dia enviado e do dia atual

  let output = "Você tem ";

  if (resultDay == 1) {
    output += `${resultDay.toLocaleString("pt-br")} dia.`;
  } else if (resultDay > 1) {
    output += `${resultDay.toLocaleString("pt-br")} dias.`;
  }

  result.innerHTML = output.trim();
}

function CalculationHours(year, month, day) {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date(yearCurrent, monthCurrent - 1, dayCurrent);

  const time = currentDate - birthDate; // retorna a difereça em milisegundos entre a data enviado e a data atual

  const resultHour = Math.floor(time / (1000 * 60 * 60)); // multiplica 1000 milisegundos por 60 segundo(que compõem um minuto), o resusultado multiplica por 60 minutos(que compõem um hora),  no final divide pelos milisegundo da diferenca do dia enviado e do dia atual

  let output = "Você tem ";

  if (resultHour == 1) {
    output += `${resultHour.toLocaleString("pt-br")} hora.`;
  } else if (resultHour > 1) {
    output += `${resultHour.toLocaleString("pt-br")} horas.`;
  }

  result.innerHTML = output.trim();
}

function CalculationMinutes(year, month, day) {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date(yearCurrent, monthCurrent - 1, dayCurrent);

  const time = currentDate - birthDate; // retorna a difereça em milisegundos entre a data enviado e a data atual

  const resultMinutes = Math.floor(time / (1000 * 60)); // multiplica 1000 milisegundos por 60 segundo(que compõem um minuto),  no final divide pelos milisegundo da diferenca do dia enviado e do dia atual

  let output = "Você tem ";

  if (resultMinutes == 1) {
    output += `${resultMinutes.toLocaleString("pt-br")} minuto.`;
  } else if (resultMinutes > 1) {
    output += `${resultMinutes.toLocaleString("pt-br")} minutos.`;
  }

  result.innerHTML = output.trim();
}
