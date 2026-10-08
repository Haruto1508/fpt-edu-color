import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function contributeWordPlugin() {
  const jsonPath = path.resolve(__dirname, 'src/data/contributedWords.json')
  return {
    name: 'contribute-word-api',
    configureServer(server) {
      server.middlewares.use('/api/contribute-word', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const newWord = JSON.parse(body)
              let words = []
              if (fs.existsSync(jsonPath)) {
                words = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
              }
              words.unshift(newWord)
              fs.writeFileSync(jsonPath, JSON.stringify(words, null, 2), 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, word: newWord, allWords: words }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
          })
        } else if (req.method === 'GET') {
          let words = []
          if (fs.existsSync(jsonPath)) {
            words = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
          }
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(words))
        } else {
          res.statusCode = 405
          res.end()
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contributeWordPlugin()],
})

