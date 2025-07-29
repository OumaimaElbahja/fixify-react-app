import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import svgPaths from "../imports/svg-qwxo05gs0n";
import imgImage25 from "figma:asset/62778d3fb2898db7b5f423b72a740187804d7731.png";
import { imgGroup1 } from "../imports/svg-14wdy";

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  isInteractive?: boolean;
  options?: Array<{
    id: string;
    label: string;
    icon?: string;
    color?: string;
  }>;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize conversation with a delay for better UX
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: '1',
          type: 'bot',
          content: '👋 Bonjour ! Je suis **FixiBot**, votre assistant de diagnostic intelligent.\n\nJe vais vous aider à diagnostiquer votre problème. Quel type d\'appareil rencontrez-vous un souci ?',
          timestamp: new Date(),
          isInteractive: true,
          options: [
            { id: 'smartphone', label: 'Smartphone', icon: '📱', color: 'from-blue-500 to-purple-600' },
            { id: 'laptop', label: 'Laptop', icon: '💻', color: 'from-green-500 to-blue-600' },
            { id: 'tablet', label: 'Tablette', icon: '📱', color: 'from-purple-500 to-pink-600' },
            { id: 'console', label: 'Console', icon: '🎮', color: 'from-red-500 to-orange-600' },
            { id: 'tv', label: 'Télévision', icon: '📺', color: 'from-indigo-500 to-blue-600' },
            { id: 'other', label: 'Autre', icon: '⚙️', color: 'from-gray-500 to-gray-600' }
          ]
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    // Animation delay for opening
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleDeviceSelect = (deviceId: string, deviceLabel: string) => {
    setSelectedDevice(deviceId);
    
    // Add user selection
    addMessage({
      type: 'user',
      content: deviceLabel
    });

    // Bot response with symptoms
    simulateTyping(() => {
      const symptomsMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Parfait ! Vous avez sélectionné **${deviceLabel}**.\n\nMaintenant, dites-moi quel est le symptôme principal que vous observez ?`,
        timestamp: new Date(),
        isInteractive: true,
        options: [
          { id: 'no_power', label: "Ne s'allume pas", icon: '⚡', color: 'from-red-500 to-pink-600' },
          { id: 'screen_frozen', label: 'Écran bloqué', icon: '🔒', color: 'from-orange-500 to-red-600' },
          { id: 'battery_hot', label: 'Batterie chauffe', icon: '🔥', color: 'from-yellow-500 to-orange-600' },
          { id: 'slow_performance', label: 'Performances lentes', icon: '🐌', color: 'from-blue-500 to-indigo-600' },
          { id: 'broken_screen', label: 'Écran cassé', icon: '💔', color: 'from-purple-500 to-pink-600' },
          { id: 'other_symptom', label: 'Autre symptôme', icon: '❓', color: 'from-gray-500 to-gray-600' }
        ]
      };
      setMessages(prev => [...prev, symptomsMessage]);
      setCurrentStep('symptoms');
    });
  };

  const handleSymptomSelect = (symptomId: string, symptomLabel: string) => {
    setSelectedSymptom(symptomId);
    
    // Add user selection
    addMessage({
      type: 'user',
      content: symptomLabel
    });

    // Bot response with interactive test
    simulateTyping(() => {
      const testMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Je vois que votre appareil **${symptomLabel.toLowerCase()}**. \n\nLaissez-moi faire quelques vérifications pour identifier le problème précis.\n\n🔍 **Test de diagnostic :**\nQuand vous appuyez sur le bouton power, que se passe-t-il exactement ?`,
        timestamp: new Date(),
        isInteractive: true,
        options: [
          { id: 'light_on', label: 'Une lumière s\'allume', icon: '💡', color: 'from-green-500 to-blue-600' },
          { id: 'vibrates', label: 'Ça vibre', icon: '📳', color: 'from-blue-500 to-purple-600' },
          { id: 'nothing', label: 'Rien ne se passe', icon: '❌', color: 'from-red-500 to-pink-600' },
          { id: 'strange_sound', label: 'Bruit étrange', icon: '🔊', color: 'from-orange-500 to-red-600' }
        ]
      };
      setMessages(prev => [...prev, testMessage]);
      setCurrentStep('diagnosis');
    });
  };

  const handleTestResponse = (responseId: string, responseLabel: string) => {
    // Add user response
    addMessage({
      type: 'user',
      content: responseLabel
    });

    // Final diagnosis
    simulateTyping(() => {
      const confidence = Math.floor(Math.random() * 20) + 75; // 75-95%
      const diagnosisMessage = `🤖 **Diagnostic IA terminé** - ${confidence}% de certitude\n\n⚠️ **Problème identifié :** Dysfonctionnement de la batterie\n\n📋 **Analyse :**\nSelon vos réponses, il semble que votre batterie soit défectueuse ou en fin de vie. Ce type de panne nécessite généralement un remplacement.\n\n💡 **Recommandation :** Contactez un réparateur certifié pour un diagnostic approfondi et un devis.`;
      
      addMessage({
        type: 'bot',
        content: diagnosisMessage
      });

      // Add repair request button after a short delay
      setTimeout(() => {
        addMessage({
          type: 'bot',
          content: 'repair_cta',
          isInteractive: true
        });
      }, 1500);
    }, 3000);
  };

  const handleRepairRequest = () => {
    // Add user action
    addMessage({
      type: 'user',
      content: '🔧 Demande de réparation'
    });

    // Bot confirmation
    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: '✅ **Parfait !** Votre demande de réparation a été enregistrée.\n\n📧 Vous allez recevoir **3-5 devis** de réparateurs certifiés dans les **15 minutes**.\n\n📱 Un SMS de confirmation va vous être envoyé sous peu.\n\n💬 Merci d\'avoir utilisé FixiBot !'
      });
    }, 1000);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep('welcome');
    setSelectedDevice('');
    setSelectedSymptom('');
    setIsTyping(false);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  const renderMessage = (message: Message, index: number) => {
    if (message.type === 'bot') {
      return (
        <div 
          className={`flex items-start gap-3 mb-6 animate-fade-in-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Bot Avatar */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e67a17] to-[#d66a0e] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>

          <div className="flex-1 max-w-sm">
            {/* Bot message bubble */}
            {message.content === 'repair_cta' ? (
              <div className="backdrop-blur-md bg-white/90 border border-white/20 rounded-2xl p-5 shadow-xl animate-bounce-subtle">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Diagnostic terminé !</h4>
                    <p className="text-sm text-gray-600">Prêt pour la réparation</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-4 border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🔧</span>
                    <span className="font-semibold text-gray-800">Action recommandée</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Connectez-vous avec nos réparateurs certifiés pour résoudre votre problème rapidement.
                  </p>
                </div>

                <Button 
                  onClick={handleRepairRequest}
                  className="w-full bg-gradient-to-r from-[#e67a17] to-[#d66a0e] hover:from-[#d66a0e] hover:to-[#c55a08] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Demander une réparation
                </Button>
              </div>
            ) : (
              <div className="backdrop-blur-md bg-white/95 rounded-2xl p-4 shadow-lg border border-white/20">
                <div 
                  className="text-sm text-gray-800 leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                />
                
                {/* Interactive options */}
                {message.isInteractive && message.options && (
                  <div className="grid grid-cols-2 gap-2 mt-5">
                    {message.options.map((option, optionIndex) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          if (currentStep === 'welcome') {
                            handleDeviceSelect(option.id, option.label);
                          } else if (currentStep === 'symptoms') {
                            handleSymptomSelect(option.id, option.label);
                          } else if (currentStep === 'diagnosis') {
                            handleTestResponse(option.id, option.label);
                          }
                        }}
                        className={`group relative overflow-hidden bg-gradient-to-r ${option.color || 'from-gray-500 to-gray-600'} text-white rounded-xl p-3 hover:scale-105 transition-all duration-300 transform hover:shadow-lg animate-fade-in-up`}
                        style={{ animationDelay: `${(index + optionIndex) * 100 + 300}ms` }}
                      >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                        <div className="relative flex flex-col items-center text-center">
                          <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                            {option.icon}
                          </div>
                          <div className="text-xs font-medium leading-tight">{option.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div 
          className={`flex justify-end mb-6 animate-fade-in-left`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="bg-gradient-to-r from-[#0b3e74] to-[#1e4a7a] text-white rounded-2xl px-4 py-3 max-w-xs shadow-lg">
            <p className="text-sm font-medium">{message.content}</p>
            <div className="text-xs opacity-75 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative backdrop-blur-md bg-gradient-to-br from-[#e67a17] to-[#d66a0e] hover:from-[#d66a0e] hover:to-[#c55a08] text-white rounded-full p-4 shadow-2xl transition-all duration-500 transform hover:scale-110 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            } border-4 border-white/20`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            {isOpen ? (
              <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </button>

          {/* Pulse animation rings */}
          {!isOpen && (
            <>
              <div className="absolute inset-0 bg-[#e67a17] rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-0 bg-[#e67a17] rounded-full animate-pulse opacity-30"></div>
            </>
          )}

          {/* Notification badge */}
          {!isOpen && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce border-2 border-white">
              !
            </div>
          )}
        </div>
      </div>

      {/* Chat Interface */}
      {isVisible && (
        <div className={`fixed bottom-24 right-6 w-96 h-[600px] z-40 transition-all duration-500 transform ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}>
          <div className="backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/20 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b3e74] to-[#1e4a7a] opacity-90"></div>
              <div className="relative flex items-center justify-between p-5 text-white">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#e67a17] to-[#d66a0e] rounded-full flex items-center justify-center border-3 border-white/30">
                      <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">FixiBot Assistant</h3>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>En ligne • Répond instantanément</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetChat}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                    title="Nouveau chat"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/50 to-blue-50/30">
              {messages.map((message, index) => renderMessage(message, index))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-3 animate-fade-in-up">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#e67a17] to-[#d66a0e] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-white font-bold text-sm">F</span>
                  </div>
                  <div className="backdrop-blur-md bg-white/95 rounded-2xl p-4 shadow-lg border border-white/20">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-600 mr-3">FixiBot analyse...</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#e67a17] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#e67a17] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-[#e67a17] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="backdrop-blur-md bg-white/80 border-t border-white/20 p-4">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">
                  🔒 Vos données sont sécurisées • IA certifiée
                </p>
                <p className="text-xs text-gray-500">
                  Powered by <span className="font-semibold text-[#e67a17]">Fixify</span> Intelligence
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced CSS */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }
      `}</style>
    </>
  );
}