export async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works", {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        return false;
    }
    const data = await response.json();
    return data;
}
/*
export async function addWork(image, title, category) {
    const form = new FormData()
    form.append("title", title)
    form.append("category", category)
    form.append("image", image)
    const response = await fetch("http://localhost:5678/api/works", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: form
    });
    if (!response.ok) {
        return false;
    }
    const data = await response.json();
    return data;
}
*/
export async function addWork(image, title, category) {
    const formData = new FormData();
    formData.append('title', title)
    formData.append('image', image)
    formData.append('category', category)

    const token = localStorage.getItem('token')
    let response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            //indique au serveur que le client est autorisé à acceder à la ressource demandée
            'Authorization': 'Bearer ' + token,
        },
        body: formData
    })
    let data = await response.json()
    return data
}

export const deleteWork = async (_id) => {
    const token = localStorage.getItem('token')
    let response = await fetch(`http://localhost:5678/api/works/${_id}`, {
        method: 'DELETE',
        headers: {
            //indique au serveur que le client est autorisé à accéder à la ressource demandée
            'Authorization': 'Berear ' + token,
        },
    })

    if(response.ok){
        return true
    }
}

/*
export async function deleteWork(id) {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "delete",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.ok
}
*/