import "./App.css";
import UserForm from "./UserForm/UserForm";
import ImageGallery from "./ImageGallery/ImageGallery";

export default function App() {
  return (
    <div className="app">
      <h1>Image Gallery</h1>
      <ImageGallery />
      <UserForm />
    </div>
  );
}
