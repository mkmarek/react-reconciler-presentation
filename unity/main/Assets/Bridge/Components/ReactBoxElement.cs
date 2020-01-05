using Assets.Bridge.Styles;
using UnityEngine.UIElements;

namespace Assets.Bridge.Components
{
    public class ReactBoxElement : Box, IReactElement
    {
        public ReactBoxElement(BirdgePayload.BridgeMessage.ComponentProps props)
        {
            if (props != null)
            {
                this.UpdateProps(props);
            }
        }

        public void UpdateProps(BirdgePayload.BridgeMessage.ComponentProps props)
        {
            if (props.style != null)
            {
                StyleMapper.AssignStyleProps(props.style, this);
            }
        }
    }
}
