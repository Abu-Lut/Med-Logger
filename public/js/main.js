let checkMarks = document.querySelectorAll('.check')

let xMarks = document.querySelectorAll('.x')

Array.from(checkMarks).forEach(checkM => checkM.addEventListener('click',updateDone))

Array.from(xMarks).forEach(xM => xM.addEventListener('click',deleteMed))

async function updateDone(){
    const mName = this.parentNode.childNodes[1].innerText
    const mTime = this.parentNode.childNodes[3].innerText
    const mStatus = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('updateDone', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'medName': mName,
              'medTiming': mTime,
              'medStatus': mStatus
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function deleteMed(){
    const mName = this.parentNode.childNodes[1].innerText
    const mTime = this.parentNode.childNodes[3].innerText
    const mStatus = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deleteMed', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'medName': mName,
                'medTiming': mTime,
                'medStatus': mStatus
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// let crossMarks = document.querySelectorAll('.cross')

// Array.from(crosskMarks).forEach(checkM => checkM.addEventListener('click',updateNotDone))

// function updateNotDone(){

// }