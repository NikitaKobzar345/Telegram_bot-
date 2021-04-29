require('dotenv').config()


const { Telegraf, Markup, Context } = require('telegraf')
const item=require('./item')

const bot = new Telegraf(process.env.BOT_TOKEN,{
    polling: {
        interval:300,
        autostart:true,
        params: {
            timeout:10
        }
    }
});

var cron = require('node-cron');
 
cron.schedule('0 0 3 * *', () => {
 arr.splice(0,arr.length);
    
 console.log('Выполнять каждый месяц');
});


    bot.start((ctx)=> ctx.reply(`

Здравствуйте,${ctx.message.from.first_name}! Я ваш бот-компаньон,помогу сэкономить ваши финансы и составить граммотный план их расходов! 
Для начала ознакомьтесь с разделом категории('Общие') и вносите траты по упомянутым  критериям. 
Если хотите задать сумму которая не должна превышать ваш бюджет выбирите команду 'Ввести лимитную сумму' 
Если хотите удалить расход пишите команду /del,затем то значение  которое хотите удалить.Данные введеные вами сохраняются месяц,после чего, все сбрасывается`, 

        Markup.keyboard([
            ['Внести расходы', 'Показать общую сумму трат'],
            ['Показать расходы за месяц', 'Ввести лимитную сумму'],
            ['Общее','Показать лимитную сумму'],

    ])
        .resize()       
        .extra()
   )
); 


const arr = [];
var limit;
var value;

bot.hears('Общее', (ctx) => ctx.reply('Общее:\n   \n Категории:/categories\n Удалить расход:/del\n '))

bot.hears('Внести расходы',(ctx) => ctx.reply ('Введите сумму и обьект трат '))

bot.hears('/categories',(ctx) => ctx.reply (item))


bot.hears('Ввести лимитную сумму',(ctx)=>{
        {ctx.reply('Вводите сумму')};
})    


bot.hears('Показать лимитную сумму',(ctx)=>{
    {ctx.reply(`Ваш бюджет ${limit}`)} 
 }) 


bot.hears('Показать общую сумму трат',(ctx)=>{
     value= arr.reduce((acc, obj) => { acc[0] +=Number (obj.amount); return acc; }, [0]);// суммирование всех значений 
     
     if(value[0]>limit){
        {ctx.reply('Вы превысили лимит')};
    }
  {ctx.reply(`${value}`)}; 
})
  

bot.hears('Показать расходы за месяц',(ctx)=>{
    let arrayOfexpenses = []; 
    for(let i = 0; i<=arr.length; i++){
        let rest = arr[i];//обращение к элементу массива    
        for(let key in rest){
         arrayOfexpenses.push(rest[key]);  
         
        }   
    }
   
       {ctx.reply(`Траты за месяц- \n ${vis} \n `)}; 
});

bot.on( 'text',(ctx)=>{ 

    try{

    var expense = ctx.message.text;
    var formEx = expense.split(' ');
    var amounount = formEx[0];// получить первый элемент 
    var categorie = formEx[1];// получить второй 
    
    
    if(item.includes(categorie)){
        arr.push({amount:amounount, categori:categorie});// запушить значение в массив
      

        {ctx.reply('Ваши траты были внесены')}

    } else if(expense.includes("/del")){

      const newArr=arr.findIndex(item=>item.amount===formEx[1]);
      arr.splice(newArr,1);
      

        {ctx.reply(`Вы удалили`)};
       
 
}   else if(!isNaN(formEx)){ 
    limit = formEx;    
    

    {ctx.reply(`Лимитная сумма ${limit}`)}  

} 
    } catch(e){
        ctx.reply('Простите,я не знаю как на это ответить');

          }

    })  

bot.launch();
