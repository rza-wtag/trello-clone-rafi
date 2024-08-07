import Card from "./Card";

function List({ title, cards, onAddCard }) {
  return (
    <div className="list">
      <h3>{title}</h3>
      <div className="card-container">
        {cards.map((card, index) => (
          <Card key={index} text={card} />
        ))}
      </div>
      <button className="add-card" onClick={onAddCard}>
        + Add a card
      </button>
    </div>
  );
}

export default List;
