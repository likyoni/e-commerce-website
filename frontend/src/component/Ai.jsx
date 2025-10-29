import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

function Ai() {
    let { showSearch, setShowSearch } = useContext(shopDataContext)
    let navigate = useNavigate()
    let [activeAi, setActiveAi] = useState(false)
    let openingSound = new Audio(open)

    function speak(message) {
        let utterence = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterence)
    }

    // You will need to implement this function separately if you use this command later
    const handleLogout = () => {
        // Implement your Firebase/API logout logic here
        console.log("User logged out (simulated).")
        toast.success("You have been logged out.")
        navigate("/");
    };
    
    // NEW: Placeholder for clearing the cart
    const handleClearCart = () => {
        // Implement your context/state logic to clear the cart items here
        console.log("Cart cleared (simulated).")
        speak("Your shopping cart has been emptied.")
        toast.info("Shopping cart items cleared.")
    };


    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new speechRecognition()
    
    if (!recognition) {
        console.log("Speech recognition not supported")
        toast.error("Voice commands not supported by your browser.")
    }

    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.trim().toLowerCase();
        console.log("Transcript:", transcript);

        // Helper function for navigation and feedback
        const navigateTo = (path, spokenText, closeSearch = false) => {
            speak(spokenText);
            navigate(path);
            if (closeSearch) {
                setShowSearch(false);
            }
        };

        // --- Core Page Navigation ---
        if (transcript.includes("home") || transcript.includes("homepage")) {
            navigateTo("/", "Opening home page", true);
        } else if (transcript.includes("about") || transcript.includes("about page")) {
            navigateTo("/about", "Opening about page", true);
        } else if (transcript.includes("collection") || transcript.includes("product")) {
            navigateTo("/collection", "Opening collection page", true);
        } else if (transcript.includes("cart") || transcript.includes("kaat") || transcript.includes("caat")) {
            navigateTo("/cart", "Opening your shopping cart", true);
        } else if (transcript.includes("contact")) {
            navigateTo("/contact", "Opening contact page", true);
        } else if (transcript.includes("order") || transcript.includes("my orders")) {
            navigateTo("/order", "Opening your orders page", true);
        
        // --- Authentication/User Pages & Logout ---
        } else if (transcript.includes("login") || transcript.includes("log in") || transcript.includes("sign in")) {
            navigateTo("/login", "Taking you to the login screen", true);
        } else if (transcript.includes("register") || transcript.includes("sign up")) {
            navigateTo("/register", "Taking you to the registration page", true);
        } else if (transcript.includes("profile") || transcript.includes("dashboard") || transcript.includes("my account")) {
            navigateTo("/profile", "Opening your user profile", true);
        } else if (transcript.includes("logout") || transcript.includes("log out")) {
            speak("Logging you out now.");
            handleLogout(); 
        
        // --- Search/UI Control ---
        } else if ((transcript.includes("open") || transcript.includes("show")) && transcript.includes("search") && !showSearch) {
            speak("Opening search bar and navigating to products");
            setShowSearch(true);
            navigate("/collection");
        } else if ((transcript.includes("close") || transcript.includes("hide")) && transcript.includes("search") && showSearch) {
            speak("Closing search bar");
            setShowSearch(false);

        // --- Product/Detail Navigation ---
        } else if (transcript.includes("view product") || transcript.includes("show details")) {
            const productName = transcript.split('of ').pop() || transcript.split('product ').pop();
            speak(`Searching for details on ${productName || 'the requested product'}.`);
            navigate("/product/sample-id"); // Placeholder route

        // --- Browser Control ---
        } else if (transcript.includes("go back") || transcript.includes("previous page")) {
            speak("Going back to the previous page.");
            navigate(-1); 
            setShowSearch(false);

        // --- NEW: E-commerce Checkout & Utility ---
        } else if (transcript.includes("checkout") || transcript.includes("check out") || transcript.includes("by now")) {
            navigateTo("/checkout", "Initiating secure checkout.", true);

        } else if (transcript.includes("shipping") || transcript.includes("delivery")) {
            navigateTo("/shipping-info", "Showing shipping and delivery information.", true);
            
        } else if (transcript.includes("clear cart") || transcript.includes("empty cart") || transcript.includes("remove all")) {
            handleClearCart(); // NEW FUNCTION CALL
            
        } else if (transcript.includes("check stock") || transcript.includes("stock status")) {
            // This would typically involve product name parsing and an API call, 
            // but for voice utility, a simple text response is often sufficient.
            speak("To check stock, please navigate to a product page and view the availability status.");

        // --- Simple Interactions/Greetings & Help ---
        } else if (transcript.includes("hello") || transcript.includes("hi") || transcript.includes("hey")) {
            speak("Hello! I am OneCart AI. You can say 'help' for a list of commands.");
        } else if (transcript.includes("thank you") || transcript.includes("thanks")) {
            speak("You're very welcome! Let me know if you need anything else.");
        } else if (transcript.includes("help") || transcript.includes("what can you do")) { 
            speak("I can open pages like Home, Cart, and Profile. I can also handle checkout, show shipping info, and help you log out.");
        
        // --- Default Fallback ---
        } else {
            speak("Sorry, I didn't catch that command. Please try again.");
            toast.error("Command not recognized. Try again.");
        }
    }

    recognition.onend = () => {
        setActiveAi(false)
    }

    recognition.onerror = (e) => {
        console.error('Speech recognition error:', e.error);
        if (e.error !== 'no-speech') {
            speak("There was an error recognizing your voice.");
            toast.error(`Voice recognition error: ${e.error}`);
        }
        setActiveAi(false);
    };

    return (
        <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] z-50' 
            onClick={() => {
                if (!activeAi) {
                    recognition.start();
                    openingSound.play();
                    setActiveAi(true);
                }
            }}>
            <img 
                src={ai} 
                alt="AI Voice Assistant" 
                className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125 ' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform duration-300`} 
                style={{
                    filter: ` ${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`
                }}
            />
        </div>
    )
}

export default Ai;