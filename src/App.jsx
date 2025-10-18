import { useEffect, useMemo, useState } from "react";
import { Search, User, Plus } from "lucide-react";
import "./App.css";

const FALLBACK_CONTACTS = [
    {
        id: 1,
        name: "Homer Simpson",
        phone: "(123) 456-7890",
        email: "homer@example.com"
      },
      {
        id: 2,
        name: "Marge Simpson",
        phone: "(123) 456-7890",
        email: "marge@example.com"
      },
      {
        id: 3,
        name: "Bart Simpson",
        phone: "(123) 456-7890",
        email: "bart@example.com"
      },
      {
        id: 4,
        name: "Lisa Simpson",
        phone: "(123) 456-7890",
        email: "lisa@example.com"
      },
      {
        id: 5,
        name: "Maggie Simpson",
        phone: "(123) 456-7890",
        email: "maggie@example.com"
      },
      {
        id: 6,
        name: "Ned Flanders",
        phone: "(123) 456-7890",
        email: "ned@example.com"
      },
      {
        id: 7,
        name: "Moe Szyslak",
        phone: "(123) 456-7890",
        email: "moe@example.com"
      },
      {
        id: 8,
        name: "Apu Nahasapeemapetilon",
        phone: "(123) 456-7890",
        email: "apu@example.com"
      },
      {
        id: 9,
        name: "Krusty Clown",
        phone: "(123) 456-7890",
        email: "krusty@example.com"
      },
      {
        id: 10,
        name: "Chief Wiggum",
        phone: "(123) 456-7890",
        email: "chief@example.com"
      }
]

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);

    const [query, setQuery] = useState("");

    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }

    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">
                    <img src="/images/donut.png" alt="Donut icon" className="page__title-icon" />
                    Phonebook Challenge
                </h1>
                <p className="page__subtitle">Simple contact directory</p>
            </header>

            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Search Contacts</h2>
                <div className="search__controls">
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name or phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                    <button className="btn" type="submit" aria-label="Search Contacts"><Search size={16} aria-hidden="true" /></button>
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {contacts.length}{" "}
                    {contacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contacts</h2>
                <ul className="contacts__grid">
                    {contacts.map((contact) => (
                        <li key={contact.id} className="contact-card">
                            <div className="contact-card__avatar">
                                <User size={40} aria-hidden="true" />
                            </div>
                            <h3 className="contact-card__name">{contact.name}</h3>
                            <p className="contact-card__phone">{contact.phone}</p>
                            <p className="contact-card__email">{contact.email}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add Contact</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            placeholder="Hasib Shaif"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            placeholder="(123) 456-7890"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="hasib.shaif@example.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="form__actions">
                        <button className="btn" type="submit" data-testid="btn-add">
                            <Plus size={16} aria-hidden="true" />
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default App;
