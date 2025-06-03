"use client"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🛡️ Assistente de Prevenção de Desastres
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-lg text-gray-600 text-center">
            Olá! Sou seu assistente virtual para prevenção de desastres naturais.
          </p>
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800 font-semibold">
              ✅ Projeto funcionando!<br/>
              ✅ Deploy bem-sucedido<br/>
              ✅ Pronto para usar!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
