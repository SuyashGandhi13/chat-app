import ChatLayout from "../components/Chat/ChatLayout/ChatLayout";

const HomePage = (props) => {
  return <ChatLayout firestore={props.firestore} auth={props.auth} />;
};

export default HomePage;
