/*---------- CONSTANTES ----------*/

const button_table = document.querySelector('.button-table');
const write_screen = document.querySelector('.screen p#writen');
const operation_screen = document.querySelector('.screen p#operation');

/*---------- EVENT LISTENERS --------*/

button_table.onclick = (ev) => {
    let target = ev.target;
    if(target.className.includes('button-item') || target.tagName == 'SPAN' || target.tagName == 'I')
    {
        if(target.id == 'smb-eq' || target.parentElement.id == 'smb-eq') operation_calculation(write_screen.innerHTML);
        else if(target.id == 'smb-era' || target.parentElement.id == 'smb-era' || target.parentElement.parentElement.id == 'smb-era')
        {
            if(!write_screen.className.includes('starter'))
            {
                write_screen.classList.add('starter');
                write_screen.innerHTML = '0';
                operation_screen.innerHTML = '';
            }
        }
        else if(target.id == 'smb-del' || target.parentElement.id == 'smb-del' || target.parentElement.parentElement.id == 'smb-del')
        {
            if(!write_screen.className.includes('starter'))
            {
                let sliced = write_screen.innerHTML.slice(0,(write_screen.innerHTML.length-1));
                console.log(sliced);
                if(sliced.length == 0)
                {
                    write_screen.classList.add('starter');
                    write_screen.innerHTML = '0';
                }else write_screen.innerHTML = sliced;
            }
        }
        else
        {
            if(write_screen.className.includes('starter'))
            {
                write_screen.classList.remove('starter');
                write_screen.innerHTML = target.innerText;
            } 
            else write_screen.innerHTML += target.innerText;
        }
    }
};

/*------------ FUNCTIONS -------------*/

const operation_calculation = (writen_operation) => {
    if(!write_screen.className.includes('starter'))
    {
        let operation = writen_operation.split(/\D/).filter((e)=>e);
        let operators = writen_operation.split(/\d/).filter((e)=>e);
        if(operators.length == operation.length - 1)
        {
            let firstNum = parseInt(operation[0]);
            let operator = 0;
            for(let item = 1; item < operation.length; item++)
            {
                switch(operators[operator])
                {
                    case '/':
                        firstNum /= parseInt(operation[item]);
                        break;
                    case '*':
                        firstNum *= parseInt(operation[item]);
                        break;
                    case '+':
                        firstNum += parseInt(operation[item]);
                        break;
                    case '-':
                        firstNum -= parseInt(operation[item]);
                        break;
                }
                operator += 1;
            }
            operation_screen.innerHTML = writen_operation+'=';
            write_screen.innerHTML = parseInt(firstNum);
        }
    }
};