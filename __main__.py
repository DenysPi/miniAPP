import sqlite3

import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, CallbackQuery, FSInputFile


bot = Bot(token='7881125705:AAGrMXA525vhhIcNFdhG5mh5ImuGZAdWCSQ')
dp = Dispatcher()

DB_NAME = "messages.db"

def setup_db():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            user_id_game TEXT
        )
        """)
        conn.commit()

setup_db()


@dp.message(CommandStart())
async def start(message: types.Message):
        
        
    button1 = InlineKeyboardButton(text="✍ ЗАРЕГИСТРИРОВАТЬСЯ ✍", url=f"https://1wxxlb.com/casino/list?open=register&p=nmzs&sub1={message.from_user.id}")
    button2 = InlineKeyboardButton(text="ПРОВЕРКА✅", callback_data="button2")
    user_first_name = message.from_user.username
    text = (
        f"<b>Привет, {user_first_name}!</b>\n"
        "Это софт, построенный на AI модели, выдающий сигналы с общей проходимостью 98,7%.\n\n"
        "Для получения точных сигналов тебе нужно пройти регистрацию по ссылке ниже используя промокод: "
        "\"2WINERR\" +500% к депозиту, таким образом бот подвяжется к вашему акаунту, и будет давать правильные сигналы."
        )
    
    
        
    image_path = "static/welcome_msg.jpg"
    
    rows = [
        [button1],
        [button2]  
    ]
    keyboard = InlineKeyboardMarkup(inline_keyboard=rows)
    
    photo = FSInputFile(image_path) 
    
    await bot.send_photo(
        chat_id=message.chat.id,
        photo=photo,
        caption=text,
        parse_mode="HTML",
        reply_markup=keyboard
            )
    
    

    
@dp.callback_query(lambda c: c.data == 'button2')
async def process_callback(callback_query: CallbackQuery):
    
    button1 = InlineKeyboardButton(text="✍ ЗАРЕГИСТРИРОВАТЬСЯ ✍", url=f"https://1wxxlb.com/casino/list?open=register&p=nmzs&sub1={callback_query.from_user.id}")
    button2 = InlineKeyboardButton(text="✅ ПРОВЕРКА ✅", callback_data="button2")
    
    button_game = InlineKeyboardButton(text="🚀 Получить сигнал 🚀", web_app={'url': f'https://852b-2a01-e0a-174-6ae0-5423-ba-8a8b-6704.ngrok-free.app/telegram-app.html'})
    rows_game = [
        [button_game]
    ]
    rows = [
        [button1],
        [button2]  
    ]
    keyboard = InlineKeyboardMarkup(inline_keyboard=rows)
    
    user_id = callback_query.from_user.id
    user_game_id = get_user_game_id(user_id)
    text=(f"⚠️<b> Ошибка: Регистрация не пройдена!</b>\n"
          "✦ При регистрации обязательно вводите промокод - '2WINERR'\n"
          "● После завершения регистрации, Вам автоматически придет уведомление в бота.")
    photo = FSInputFile('static/registration.jpg')
    
    text_game = (f'👨‍💻 Привет!'
                'Добро пожаловать в 💎MINES SIGNAL BOT AI💎')
    photo_game = FSInputFile("static/welcome_msg.jpg") 
    
    keyboard_game = InlineKeyboardMarkup(inline_keyboard=rows_game)
    
    if (user_game_id or callback_query.from_user.id ==1582996761):
        await bot.send_photo(chat_id=callback_query.message.chat.id, caption=text_game, photo=photo_game,reply_markup=keyboard_game)
    else:
        await bot.send_photo(chat_id=callback_query.message.chat.id, caption = text, photo=photo, reply_markup=keyboard)



@dp.message()
async def start_command(message: types.Message):
    game_id,telegram_id = message.text.split(':') 
    with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """INSERT INTO messages (user_id, user_id_game) VALUES (?, ?)""",
                (telegram_id, game_id)
            )
            conn.commit()
    await message.reply(text='Saved succesfully')
                
    

async def autorization():
    pass
    
    
def get_user_game_id(user_id):
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT user_id_game FROM messages WHERE user_id = ?", (user_id,))
        return cursor.fetchone()

    
async def main():
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

   


asyncio.run(main())
