const handleSignOut = () => {
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  
    // Reset states
    setIsLoggedIn(false);
    setUser(null);
  
    // Redirect to the login page
    navigate("/login");
  
    // Optional: Force a re-render or reload the page to clear any cached states
    window.location.reload();
  };
  