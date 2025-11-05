import { useEffect, useState } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import "./App.css";

const FALLBACK_CONTACTS = [
    {
        id: 1,
        name: "Homer Simpson",
        phone: "(123) 456-7890",
        email: "homer@example.com",
        image: "/images/homer-simpson.jpeg"
      },
      {
        id: 2,
        name: "Marge Simpson",
        phone: "(123) 456-7890",
        email: "marge@example.com",
        image: "/images/marge-simpson.jpeg"
      },
      {
        id: 3,
        name: "Bart Simpson",
        phone: "(123) 456-7890",
        email: "bart@example.com",
        image: "/images/bart-simpson.jpeg"
      },
      {
        id: 4,
        name: "Lisa Simpson",
        phone: "(123) 456-7890",
        email: "lisa@example.com",
        image: "/images/lisa-simpson.jpeg"
      },
      {
        id: 5,
        name: "Maggie Simpson",
        phone: "(123) 456-7890",
        email: "maggie@example.com",
        image: "/images/maggie-simpson.jpeg"
      },
      {
        id: 6,
        name: "Ned Flanders",
        phone: "(123) 456-7890",
        email: "ned@example.com",
        image: "/images/ned-flanders.jpeg"
      },
      {
        id: 7,
        name: "Moe Szyslak",
        phone: "(123) 456-7890",
        email: "moe@example.com",
        image: "/images/moe-szyslak.jpeg"
      },
      {
        id: 8,
        name: "Apu Nahasapeemapetilon",
        phone: "(123) 456-7890",
        email: "apu@example.com",
        image: "/images/apu-nahasapeemapetilon.jpeg"
      },
      {
        id: 9,
        name: "Krusty Clown",
        phone: "(123) 456-7890",
        email: "krusty@example.com",
        image: "/images/krusty-clown.jpeg"
      },
      {
        id: 10,
        name: "Chief Wiggum",
        phone: "(123) 456-7890",
        email: "chief@example.com",
        image: "/images/chief-wiggum.jpeg"
      }
]

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);

    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [form, setForm] = useState({ name: "", phone: "", email: "" });

    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }

    // Filter contacts
    let filteredContacts = contacts;
    if (query) {
        const lowerQuery = query.toLowerCase();
        filteredContacts = contacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(lowerQuery) ||
                contact.phone.includes(query)
        );
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    const totalPages = filteredContacts.length || 1;
    const currentContact = filteredContacts[currentPage - 1] || null;

    return (
        <main className="page" data-testid="page-root" role="main">
            {/* Page header with title and animated donut icon */}
            <header className="page__header">
                <h1 className="page__title">
                    <div className="page__title-icon" aria-label="Animated donut icon"></div>
                    Phonebook Challenge
                </h1>
                <p className="page__subtitle">Simple contact directory</p>
            </header>

            {/* Search section for filtering contacts */}
            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Search Contacts</h2>
                <div className="search__controls">
                    <label htmlFor="search-input" className="sr-only">Search contacts</label>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name or phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                        aria-describedby="search-results"
                    />
                    <button className="btn" type="button" aria-label="Search Contacts">
                        <Search size={16} aria-hidden="true" />
                        <span className="sr-only">Search</span>
                    </button>
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {filteredContacts.length}{" "}
                    {filteredContacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            {/* Contacts display section */}
            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contact Directory</h2>
                {filteredContacts.length === 0 ? (
                    <p className="contacts__empty">No contacts found.</p>
                ) : (
                    <>
                        <ul className="contacts__grid" role="list">
                            {currentContact && (
                                <li key={currentContact.id} className="contact-card">
                                    <div className="contact-card__avatar">
                                        <img 
                                            src={currentContact.image} 
                                            alt={currentContact.name}
                                            className="contact-card__image"
                                        />
                                    </div>
                                    <h3 className="contact-card__name">{currentContact.name}</h3>
                                    <p className="contact-card__phone">{currentContact.phone}</p>
                                    <p className="contact-card__email">{currentContact.email}</p>
                                </li>
                            )}
                        </ul>
                        <div className="pagination" role="navigation" aria-label="Contact pagination">
                            <button
                                className="btn pagination__btn"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label="Previous contact"
                            >
                                <ChevronLeft size={16} aria-hidden="true" />
                                <span>Previous</span>
                            </button>
                            <span className="pagination__info" aria-live="polite">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="btn pagination__btn"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                aria-label="Next contact"
                            >
                                <span>Next</span>
                                <ChevronRight size={16} aria-hidden="true" />
                            </button>
                        </div>
                    </>
                )}
            </section>

            {/* Form section for adding new contacts */}
            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add Contact</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            placeholder="Homer Simpson"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                            maxLength={50}
                            aria-describedby="name-help"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            placeholder="1234567890"
                            value={form.phone}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setForm({ ...form, phone: value });
                            }}
                            required
                            pattern="[0-9]+"
                            maxLength="10"
                            aria-describedby="phone-help"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="homer@example.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            aria-describedby="email-help"
                        />
                    </div>
                    <div className="form__actions">
                        <button className="btn" type="submit" data-testid="btn-add" aria-label="Add new contact to directory">
                            <Plus size={16} aria-hidden="true" />
                            <span className="sr-only">Add Contact</span>
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default App;


