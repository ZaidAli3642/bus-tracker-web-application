import PersonDetails from "./PersonDetails";

const ChatPeople = ({ persons, handlePersonClick }) => {
  return (
    <div className="col-3 people-container">
      {persons.map((person) => (
        <PersonDetails
          image={person.image}
          name={`${person.firstname} ${person.lastname}`}
          designation={person.designation}
          handleClick={() => handlePersonClick(person)}
        />
      ))}
    </div>
  );
};

export default ChatPeople;
