import { createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient(
    'https://oveozeungattcszilybb.supabase.co',
    'sb_publishable_Aw5WAd-FXaRpqTr4lpv83Q_V6wAqfmu'
)
async function loadMessages() {
    const { data, error } = await supabase
        .from('message')
        .select('*')
        .order('created_at', { ascending: false })
    if (error) {
        console.error(error)
        return
}
const container = document.getElementById('message');
container.innerHTML = '';
data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'message';
    const title = document.createElement('h3');
    title.textContent = item.title;
    const message = document.createElement('p');
    message.textContent = item.message;
    const author = document.createElement('small');
    author.textContent = 'Posted by ' + item.author;
    div.append(title, message, author);
    container.appendChild(div);
});
}
loadMessages();

const form = document.getElementById('messageForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;
    const author = document.getElementById('author').value;
    const { data, error } = await supabase
        .from('message')
        .insert([
        {
            title: title,
            message: message,
            author: author
        }
        ]);
    if (error) {
        alert('Something went wrong!');
        console.error(error);
    } else {
        alert('Your message has been submitted!');
        form.reset();
        loadMessages();
    }
});
