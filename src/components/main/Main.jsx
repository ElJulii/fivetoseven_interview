import { useEffect, useState } from "react"
import Styles from "./main.module.css"
import Form from "../form/Form"

export default function Main() {

    const [ news, setNews ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}news.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json()

                setTimeout(() => {
                    setNews(data)
                    setLoading(false)
                    console.log(data)
                }, 1000)
            } catch (error) {
                console.error("it was an error fetching: ", error)
            }
            
        }

        fetchNews();

        const handlePopState = () => {
        setSelectedNews(null);
        };
        window.addEventListener("popstate", handlePopState);

        return () => window.removeEventListener("popstate", handlePopState);
    }, [])

    if (loading) return <main> <h2>Loading data</h2></main> 

    if (selectedNews) {
        return (
            <main className={Styles.main__one}>
                <section className={Styles.section__single}>
                    <div 
                        className={Styles.single__img}
                        style={{
                            background: `url(${import.meta.env.BASE_URL}${item.image})  center / cover no-repeat`
                        }}
                    ></div>
                    <div className={Styles.single__info}>
                        <h2>{selectedNews.title}</h2>
                        <p style={{ opacity: '50%' }} >{selectedNews.date}</p>
                        <h3>
                            СТУДИЯ ГРАФИЧЕСКОГО И ВЕБ-ДИЗАЙНА “500 НА 700” ОБЪЯВИЛА О ЗАПУСКЕ НОВОГО СЕРВИСА - СОЗДАНИИ УНИКАЛЬНЫХ ЛОГОТИПОВ ДЛЯ БИЗНЕСА. 
                        </h3>
                        <p>
                            В студии уверены, что их подход к дизайну и внимание к деталям помогут создать логотип, который станет визитной карточкой любой компании.
                        </p>
                        <p>
                            Студия уже имеет опыт работы с крупными клиентами из различных отраслей, и теперь предлагает свои услуги малым и средним предприятиям.
                            “Мы стремимся к тому, чтобы каждый клиент получил именно то, что ему нужно, и в то же время оставался доволен результатом”, - говорит руководитель студии “500 на 700”.
                        </p>
                        <p>
                            Новый сервис уже доступен на сайте студии, и клиенты могут заказать разработку логотипа как для своего бизнеса, так и для социальных сетей. “Создание логотипа - это 
                            важный шаг для любого бизнеса, и мы рады помочь в этом процессе”, - добавляет руководитель студии.
                        </p>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main>
            <section className={Styles.section__news}>
                <h1 style={{ margin: "40px 4% 30px" }} >НОВОСТИ</h1>
                <div className={Styles.news__list}>
                    {news.map((item) => (
                        <article key={item.id} className={Styles.news__item}>
                            <div  className={Styles.news__img} 
                                style={{
                                    background: `url(${item.image}) center / cover no-repeat`
                                }}
                            ></div>
                            <div>
                                <h2 onClick={() => {
                                    setSelectedNews(item)
                                    window.history.pushState({ id: item.id }, "", `#news-${item.id}`);
                                }} className={Styles.h2_interactive}>
                                    {item.title}
                                </h2>
                                <p className={Styles.item__description}>{item.description}</p>
                                <p>{item.date}</p>
                            </div> 
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}