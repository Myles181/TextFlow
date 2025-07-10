import { useState, useEffect, useCallback } from 'react';
import { ActiveCall } from '../components/calls/CallInterface';

export interface CallState {
  activeCall: ActiveCall | null;
  callHistory: any[];
  isDialerOpen: boolean;
  callQuality: 'excellent' | 'good' | 'poor';
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'failed';
}

export const useCallStatus = () => {
  const [callState, setCallState] = useState<CallState>({
    activeCall: null,
    callHistory: [],
    isDialerOpen: false,
    callQuality: 'excellent',
    connectionStatus: 'disconnected'
  });

  const [callDuration, setCallDuration] = useState(0);

  // Timer for active calls
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (callState.activeCall && callState.activeCall.status === 'active') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [callState.activeCall]);

  // Simulate call quality monitoring
  useEffect(() => {
    if (!callState.activeCall || callState.activeCall.status !== 'active') {
      return;
    }

    const qualityInterval = setInterval(() => {
      // Simulate varying call quality
      const qualityLevels: Array<'excellent' | 'good' | 'poor'> = ['excellent', 'good', 'poor'];
      const randomQuality = qualityLevels[Math.floor(Math.random() * 3)];
      
      setCallState(prev => ({
        ...prev,
        callQuality: randomQuality
      }));
    }, 10000); // Check every 10 seconds

    return () => clearInterval(qualityInterval);
  }, [callState.activeCall]);

  const startCall = useCallback((phoneNumber: string, contact?: any) => {
    const newCall: ActiveCall = {
      contact: contact || null,
      phoneNumber,
      status: 'connecting',
      duration: 0,
      isMuted: false,
      isOnHold: false
    };

    setCallState(prev => ({
      ...prev,
      activeCall: newCall,
      connectionStatus: 'connecting'
    }));

    // Simulate call connection process
    setTimeout(() => {
      setCallState(prev => ({
        ...prev,
        activeCall: prev.activeCall ? {
          ...prev.activeCall,
          status: 'ringing'
        } : null
      }));
    }, 1000);

    setTimeout(() => {
      setCallState(prev => ({
        ...prev,
        activeCall: prev.activeCall ? {
          ...prev.activeCall,
          status: 'active'
        } : null,
        connectionStatus: 'connected'
      }));
    }, 3000);
  }, []);

  const endCall = useCallback(() => {
    if (callState.activeCall) {
      // Add to call history
      const callRecord = {
        id: Date.now().toString(),
        contact: callState.activeCall.contact,
        phoneNumber: callState.activeCall.phoneNumber,
        type: 'outgoing' as const,
        timestamp: new Date(),
        duration: callDuration,
        status: 'completed' as const
      };

      setCallState(prev => ({
        ...prev,
        activeCall: null,
        callHistory: [callRecord, ...prev.callHistory],
        connectionStatus: 'disconnected'
      }));
    }
  }, [callState.activeCall, callDuration]);

  const answerCall = useCallback((call: ActiveCall) => {
    setCallState(prev => ({
      ...prev,
      activeCall: {
        ...call,
        status: 'active'
      },
      connectionStatus: 'connected'
    }));
  }, []);

  const rejectCall = useCallback(() => {
    if (callState.activeCall) {
      const callRecord = {
        id: Date.now().toString(),
        contact: callState.activeCall.contact,
        phoneNumber: callState.activeCall.phoneNumber,
        type: 'incoming' as const,
        timestamp: new Date(),
        duration: null,
        status: 'missed' as const
      };

      setCallState(prev => ({
        ...prev,
        activeCall: null,
        callHistory: [callRecord, ...prev.callHistory],
        connectionStatus: 'disconnected'
      }));
    }
  }, [callState.activeCall]);

  const toggleMute = useCallback(() => {
    setCallState(prev => ({
      ...prev,
      activeCall: prev.activeCall ? {
        ...prev.activeCall,
        isMuted: !prev.activeCall.isMuted
      } : null
    }));
  }, []);

  const toggleHold = useCallback(() => {
    setCallState(prev => ({
      ...prev,
      activeCall: prev.activeCall ? {
        ...prev.activeCall,
        isOnHold: !prev.activeCall.isOnHold,
        status: prev.activeCall.isOnHold ? 'active' : 'on-hold'
      } : null
    }));
  }, []);

  const openDialer = useCallback(() => {
    setCallState(prev => ({
      ...prev,
      isDialerOpen: true
    }));
  }, []);

  const closeDialer = useCallback(() => {
    setCallState(prev => ({
      ...prev,
      isDialerOpen: false
    }));
  }, []);

  const getCallQualityColor = useCallback(() => {
    switch (callState.callQuality) {
      case 'excellent':
        return 'text-success-500';
      case 'good':
        return 'text-warning-500';
      case 'poor':
        return 'text-energy-500';
      default:
        return 'text-gray-400';
    }
  }, [callState.callQuality]);

  const getConnectionStatusColor = useCallback(() => {
    switch (callState.connectionStatus) {
      case 'connecting':
        return 'text-warning-500';
      case 'connected':
        return 'text-success-500';
      case 'disconnected':
        return 'text-gray-400';
      case 'failed':
        return 'text-energy-500';
      default:
        return 'text-gray-400';
    }
  }, [callState.connectionStatus]);

  const formatCallDuration = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    callState,
    callDuration,
    startCall,
    endCall,
    answerCall,
    rejectCall,
    toggleMute,
    toggleHold,
    openDialer,
    closeDialer,
    getCallQualityColor,
    getConnectionStatusColor,
    formatCallDuration
  };
}; 