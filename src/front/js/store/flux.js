const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			backendUrl: process.env.BACKEND_URL,
			token: localStorage.getItem("token") || "",
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			registerUser: async (user) => {
				const store = getStore();
				const response = await fetch(store.backendUrl + "/api/register", {
				  method: "POST",
				  headers: { "Content-type": "application/json" },
				  body: JSON.stringify({
					email: user.email,
					password: user.password,
				  }),
				});
				const mensaje = await response.json();
				console.log(mensaje);
				return true;
			  },

			  login: async (user) => {
				const store = getStore();
				const response = await fetch(store.backendUrl + "/api/login", {
				  method: "POST",
				  headers: { "Content-type": "application/json" },
				  body: JSON.stringify({ email: user.email, password: user.password }),
				});
				const mensaje = await response.json();
				console.log(mensaje);
				setStore({ ...store, token: mensaje.token });
				localStorage.setItem("token", mensaje.token);
				return true;
			  },

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
